// ExportChartModal.jsx
import React, { useState } from "react";
import { Modal, message } from "antd";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

/**
 * Props:
 *  - exportRef (React ref) : wrapper element that contains both legend & graph (preferred)
 *  - chartRef  (React ref) : inner graph container (used to locate the WebGL canvas)
 *  - fileName (string) : base filename for downloads
 */
const ExportChartModal = ({ exportRef = null, chartRef = null, fileName = "chart_export" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const OriginalData = useSelector((state) => state.data.OriginalData || []);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const svgFromPng = (pngDataUrl, width, height) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <image href="${pngDataUrl}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" />
    </svg>`;

  const finalizeCanvasExport = (format, finalCanvas) =>
    new Promise((resolve, reject) => {
      try {
        if (format === "png") {
          finalCanvas.toBlob((blob) => {
            if (!blob) return reject(new Error("PNG blob failure"));
            downloadBlob(blob, `${fileName}.png`);
            message.success("PNG export complete");
            resolve();
          }, "image/png");
        } else if (format === "jpeg" || format === "jpg") {
          finalCanvas.toBlob((blob) => {
            if (!blob) return reject(new Error("JPEG blob failure"));
            downloadBlob(blob, `${fileName}.jpg`);
            message.success("JPEG export complete");
            resolve();
          }, "image/jpeg", 0.92);
        } else if (format === "svg") {
          const png = finalCanvas.toDataURL("image/png");
          const svgString = svgFromPng(png, finalCanvas.width, finalCanvas.height);
          const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          downloadBlob(blob, `${fileName}.svg`);
          message.success("SVG export complete (raster inside SVG)");
          resolve();
        } else {
          reject(new Error("Unknown format"));
        }
      } catch (err) {
        reject(err);
      }
    });

  /**
   * Core: captureAndExport
   *
   * Swaps the Reset button visually with a div containing the text during capture,
   * captures DOM via html2canvas, composites the WebGL canvas image (captured earlier),
   * and finally restores the original button.
   */
  const captureAndExport = async (format = "png") => {
    setIsModalVisible(false);
    

    const target = (exportRef && exportRef.current) || (chartRef && chartRef.current);
    if (!target) {
      message.error("Export target not found (pass exportRef or chartRef).");
      return;
    }

    // locate the graph canvas (three.js) and the Reset button by id
    const graphCanvas =
      (chartRef && chartRef.current && chartRef.current.querySelector("canvas")) ||
      (target && target.querySelector && target.querySelector("canvas"));

    const resetBtn =
      (chartRef && chartRef.current && chartRef.current.querySelector("#resetNodesBtn")) ||
      target.querySelector("#resetNodesBtn");

    // 1) capture graph canvas image BEFORE hiding it (if present)
    let graphDataUrl = null;
    if (graphCanvas instanceof HTMLCanvasElement) {
      try {
        graphDataUrl = graphCanvas.toDataURL("image/png");
      } catch (err) {
        console.warn("graphCanvas.toDataURL() failed:", err);
        graphDataUrl = null;
      }
    }

    // save original visibilities & styles so we can restore
    const origCanvasVisibility = graphCanvas ? graphCanvas.style.visibility : null;
    const origBtnVisibility = resetBtn ? resetBtn.style.visibility : null;
    const origBtnDisplay = resetBtn ? resetBtn.style.display : null;

    // We'll create watermarkDiv next to the button (insertBefore) and hide the button using visibility hidden.
    let watermarkDiv = null;

    // Ensure target is positioned to keep layout stable
    const prevTargetPos = target.style.position;
    if (!prevTargetPos || prevTargetPos === "" || prevTargetPos === "static") {
      target.__prevPositionForExport = prevTargetPos;
      target.style.position = "relative";
    }

    const url = new URL(window.location.href);
    let watermarkText = "Exported from " + url.origin + url.pathname;
    /**
      if (watermarkText !== "www.bioicawtech.com/drugtargetnetwork/"){
        watermarkText = "www.bioicawtech.com/drugtargetnetwork/";
      }
    */
    
    try {
      // 2) Insert watermark DIV into DOM (before hiding canvas) but hide graph canvas afterwards for clean DOM snapshot
      if (resetBtn instanceof HTMLElement) {
        // ensure the export wrapper is positioned (so absolute coords are relative to it)
        const prevTargetPos = target.style.position;
        if (!prevTargetPos || prevTargetPos === "" || prevTargetPos === "static") {
          target.__prevPositionForExport = prevTargetPos;
          target.style.position = "relative";
        }
      
        const computed = window.getComputedStyle(resetBtn);
        const targetRect = target.getBoundingClientRect();
        const btnRect = resetBtn.getBoundingClientRect();
      
        // create absolutely positioned watermark over the button so text won't be clipped
        watermarkDiv = document.createElement("div");
        watermarkDiv.setAttribute("data-export-watermark", "1");
      
        // position relative to wrapper — compute offsets using offsetParent chain (robust for nested structure)
        function offsetRelativeToAncestor(el, ancestor) {
          let left = 0, top = 0;
          let cur = el;
          while (cur && cur !== ancestor) {
            left += cur.offsetLeft;
            top += cur.offsetTop;
            cur = cur.offsetParent;
          }
          return { left, top };
        }
        const { left, top } = offsetRelativeToAncestor(resetBtn, target);
      
        watermarkDiv.style.position = "absolute";
        watermarkDiv.style.left = `${Math.round(left)}px`;
        watermarkDiv.style.top = `${Math.round(top)}px`;
      
        // size & layout: allow the text to extend beyond the original button width
        watermarkDiv.style.minWidth = `${Math.round(btnRect.width)}px`;
        watermarkDiv.style.height = `${Math.round(btnRect.height)}px`;
        watermarkDiv.style.boxSizing = "border-box";
        watermarkDiv.style.padding = computed.padding || "0 1px";
        watermarkDiv.style.lineHeight = computed.lineHeight || `${Math.round(btnRect.height)}px`;
        watermarkDiv.style.display = "flex";
        // keep vertical centering
        watermarkDiv.style.alignItems = "center";
        // align text to the left edge of the watermark box
        watermarkDiv.style.justifyContent = "flex-start";
        // also ensure text is left-aligned if line wrapping occurs
        watermarkDiv.style.textAlign = "left";
      
        // prefer button font but ensure at least 24px
        const btnFs = parseFloat(computed.fontSize) || 14;
        const desiredFs = Math.max(btnFs, 20);
        watermarkDiv.style.fontSize = `${desiredFs}px`;
        watermarkDiv.style.lineHeight = `${Math.round(btnRect.height)}px`; // keep vertical centering
        watermarkDiv.style.fontWeight = computed.fontWeight || "600";
        watermarkDiv.style.fontFamily = computed.fontFamily || "sans-serif";
        watermarkDiv.style.whiteSpace = "nowrap";
        watermarkDiv.style.overflow = "visible"; // allow overflow (no clipping/ellipsis)
        watermarkDiv.style.textOverflow = "clip";
      
        // fully-black text and opaque background to cover button border
        const wrapperBg = window.getComputedStyle(target).backgroundColor || "#ffffff";
        watermarkDiv.style.background = wrapperBg;
        watermarkDiv.style.color = "#000000"; // full black
        // copy border radius so watermark overlays nicely
        watermarkDiv.style.borderRadius = computed.borderRadius || "0px";
      
        // Make it non-interactive and on top
        watermarkDiv.style.pointerEvents = "none";
        watermarkDiv.style.zIndex = "2147483647";
      
        // content
        watermarkDiv.innerText = watermarkText;
      
        // append into target (so absolute positioning is relative to target) and hide the real button visually
        target.appendChild(watermarkDiv);
        resetBtn.style.visibility = "hidden";
      
        // -- optional debug helpers (uncomment while troubleshooting) --
        // watermarkDiv.style.outline = "2px solid red";
        // console.log({ left, top, btnRect, targetRect });
      } else {
        // fallback: top-left watermark inside target (unchanged from before but styled to avoid clipping)
        watermarkDiv = document.createElement("div");
        watermarkDiv.style.position = "absolute";
        watermarkDiv.style.left = "5px";
        watermarkDiv.style.top = "5px";
        watermarkDiv.style.padding = "1px 1px";
        watermarkDiv.style.background = window.getComputedStyle(target).backgroundColor || "#ffffff";
        watermarkDiv.style.color = "#000000";
        watermarkDiv.style.pointerEvents = "none";
        watermarkDiv.style.fontSize = "20px";
        watermarkDiv.style.fontWeight = "600";
        watermarkDiv.style.whiteSpace = "nowrap";
        watermarkDiv.innerText = watermarkText;
        target.appendChild(watermarkDiv);
      }
      

      // Now hide the graph canvas (so html2canvas won't take a potentially inconsistent snapshot)
      if (graphCanvas instanceof HTMLCanvasElement) {
        graphCanvas.style.visibility = "hidden";
      }

      // 3) Capture DOM with html2canvas (watermark is present; canvas hidden)
      const scale = window.devicePixelRatio || 1;
      const htmlCanvas = await html2canvas(target, {
        useCORS: true,
        scale,
        backgroundColor: null,
        logging: false,
      });

      // 4) Prepare final composite canvas
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = htmlCanvas.width;
      finalCanvas.height = htmlCanvas.height;
      const ctx = finalCanvas.getContext("2d");
      ctx.drawImage(htmlCanvas, 0, 0);

      // 5) Composite the previously-captured graph image ON TOP of DOM snapshot (so the watermark remains visible)
      if (graphDataUrl) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = (e) => reject(e);
            img.src = graphDataUrl;
          });

          const targetRect = target.getBoundingClientRect();
          const canvasRect = graphCanvas.getBoundingClientRect();

          const left = Math.round((canvasRect.left - targetRect.left) * scale);
          const top = Math.round((canvasRect.top - targetRect.top) * scale);
          const width = Math.round(canvasRect.width * scale);
          const height = Math.round(canvasRect.height * scale);

          // Draw the graph image on top of DOM snapshot (so it's visible)
          ctx.drawImage(img, left, top, width, height);
        } catch (err) {
          console.warn("Failed to composite graph image; exporting DOM snapshot only.", err);
          message.warning("Graph image couldn't be embedded; exporting DOM snapshot only.");
        }
      } else {
        message.warning("Graph image not available (CORS or preserveDrawingBuffer). Exporting DOM snapshot only.");
      }

      // 6) Finalize and download
      await finalizeCanvasExport(format, finalCanvas);
    } catch (err) {
      console.error("Export failed:", err);
      message.error("Export failed. Check console. Ensure preserveDrawingBuffer and CORS for external assets.");
    } finally {
      // cleanup: remove watermark and restore button visibility and canvas visibility
      try {
        if (watermarkDiv && watermarkDiv.parentNode) {
          watermarkDiv.parentNode.removeChild(watermarkDiv);
        }
      } catch (e) {
        /* ignore */
      }
      try {
        if (resetBtn instanceof HTMLElement) {
          resetBtn.style.visibility = origBtnVisibility || origBtnVisibility === "" ? origBtnVisibility : "";
          resetBtn.style.display = origBtnDisplay || origBtnDisplay === "" ? origBtnDisplay : "";
        }
      } catch (e) {}
      try {
        if (graphCanvas instanceof HTMLCanvasElement && origCanvasVisibility != null) {
          graphCanvas.style.visibility = origCanvasVisibility;
        }
      } catch (e) {}
      try {
        if (target.__prevPositionForExport !== undefined) {
          target.style.position = target.__prevPositionForExport || "";
          delete target.__prevPositionForExport;
        }
      } catch (e) {}
    }
  };

  const exportToExcel = () => {
    try {
      const dataToWrite = OriginalData || [];
      const workbook = XLSX.utils.book_new();

      const sheet = XLSX.utils.json_to_sheet(dataToWrite);
      XLSX.utils.book_append_sheet(workbook, sheet, "Data");

      XLSX.writeFile(workbook, `${fileName}.xlsx`);
      message.success("Excel export complete");
    } catch (err) {
      console.error("Excel export failed:", err);
      message.error("Excel export failed. See console.");
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <CustomButton type="primary" onClick={showModal}>
        Export
      </CustomButton>

      <Modal title="Export Chart as" visible={isModalVisible} onCancel={handleCancel} footer={null} centered>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 10 }}>
          <CustomButton onClick={() => captureAndExport("png")}>Download PNG</CustomButton>
          <CustomButton onClick={() => captureAndExport("jpeg")}>Download JPEG</CustomButton>
          <CustomButton onClick={() => captureAndExport("svg")}>Download SVG</CustomButton>
          <CustomButton onClick={exportToExcel}>Download Excel</CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default ExportChartModal;
