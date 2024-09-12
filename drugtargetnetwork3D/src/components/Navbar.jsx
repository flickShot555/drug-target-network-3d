// import React from "react";
import { Row, Col ,Switch } from "antd";
import SelectComponent from "./SelectComponent"; // Ensure correct path
import CustomButton from "./CustomButton"; // Ensure correct path
import "./Stylesfiles/Navbar.css"; // Import any specific styles for Navbar
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './../app/features/data/themeSlice';


// Sample Data for Dropdowns

const Tissues = [
  { value: "Bone", label: "Bone" },
  { value: "Skin", label: "Skin" },
  { value: "Central Nervous System", label: "Central Nervous System" },
  { value: "Lung", label: "Lung" },
  { value: "Peripheral Nervous System", label: "Peripheral Nervous System" },
  { value: "Soft Tissue", label: "Soft Tissue" },
  { value: "Esophagus", label: "Esophagus" },
  { value: "Breast", label: "Breast" },
  { value: "Head and Neck", label: "Head and Neck" },
  { value: "Haematopoietic and Lymphoid", label: "Haematopoietic and Lymphoid" },
  { value: "Bladder", label: "Bladder" },
  { value: "Kidney", label: "Kidney" },
  { value: "Pancreas", label: "Pancreas" },
  { value: "Large Intestine", label: "Large Intestine" },
  { value: "Ovary", label: "Ovary" },
  { value: "Stomach", label: "Stomach" },
  { value: "Biliary Tract", label: "Biliary Tract" },
  { value: "Small Intestine", label: "Small Intestine" },
  { value: "Placenta", label: "Placenta" },
  { value: "Prostate", label: "Prostate" },
  { value: "Testis", label: "Testis" },
  { value: "Uterus", label: "Uterus" },
  { value: "Vulva", label: "Vulva" },
  { value: "Thyroid", label: "Thyroid" },
  { value: "Lymphoid", label: "Lymphoid" },
  { value: "Endometrium", label: "Endometrium" },
  { value: "Cervix", label: "Cervix" },
  { value: "Liver", label: "Liver" },
  { value: "Adrenal Gland", label: "Adrenal Gland" },
  { value: "Bowel", label: "Bowel" },
  { value: "Unknown", label: "Unknown" },
];
const Max_clinical = [
  { value: "Approved", label: "Approved drugs" },
  { value: "Phase I", label: "Phase I" },
  { value: "Phase II", label: "Phase II" },
  { value: "Phase III", label: "Phase III" },
  { value: "Preclinical", label: "Preclinical" },
  { value: "Unknown", label: "Unknown" },
];
const GDSC1 = [
  { value: "GDSC1", label: "GDSC1" },
  { value: "GDSC2", label: "GDSC2" },
  { value: "CCLE_NP24", label: "CCLE_NP24" },
  { value: "NCI-60", label: "NCI-60" },
  { value: "gCSI", label: "gCSI" },
  { value: "FIMM", label: "FIMM" },
];
const PIC50 = [
  { value: "4", label: "4-9" },
  { value: "5", label: "5-9" },
  { value: "6", label: "6-9" },
  { value: "7", label: "7-9" },
  { value: "8", label: "8-9" },
];

const Compound_class = [
  { value: "Kinase inhibitors", label: "Kinase inhibitors" },
  { value: "Transporter inhibitors", label: "Transporter inhibitors" },
  { value: "Protease inhibitors", label: "Protease inhibitors" },
  { value: "Transcription factor inhibitors", label: "Transcription factor inhibitors" },
  { value: "Cytosolic inhibitors", label: "Cytosolic inhibitors" },
  { value: "Other inhibitors", label: "Other inhibitors" },
  { value: "Ion channel inhibitors", label: "Ion channel inhibitors" },
  { value: "Epigenetic regulator inhibitors", label: "Epigenetic regulator inhibitors" },
  { value: "Phosphodiesterase inhibitors", label: "Phosphodiesterase inhibitors" },
  { value: "Enzyme inhibitors", label: "Enzyme inhibitors" },
  { value: "GPCR inhibitors", label: "GPCR inhibitors" },
  { value: "Nuclear receptor inhibitors", label: "Nuclear receptor inhibitors" },
  { value: "Cytochrome inhibitors", label: "Cytochrome inhibitors" },
  { value: "Secreted protein inhibitors", label: "Secreted protein inhibitors" },
  { value: "Membrane receptor inhibitors", label: "Membrane receptor inhibitors" },
  { value: "Phosphatase inhibitors", label: "Phosphatase inhibitors" },
  { value: "Structural protein inhibitors", label: "Structural protein inhibitors" },
  { value: "Adhesion inhibitors", label: "Adhesion inhibitors" },
  { value: "Surface antigen inhibitors", label: "Surface antigen inhibitors" },
];
const Cell_line = [
  { value: "Ewing's Sarcoma", label: "Ewing's Sarcoma" },
  { value: "Melanoma", label: "Melanoma" },
  { value: "Glioblastoma", label: "Glioblastoma" },
  { value: "Lung Carcinoid Tumor", label: "Lung Carcinoid Tumor" },
  { value: "Lung Adenocarcinoma", label: "Lung Adenocarcinoma" },
  { value: "Bronchiolo-Alveolar Lung Carcinoma", label: "Bronchiolo-Alveolar Lung Carcinoma" },
  { value: "Non-Small Cell Lung Carcinoma", label: "Non-Small Cell Lung Carcinoma" },
  { value: "Small Cell Lung Carcinoma", label: "Small Cell Lung Carcinoma" },
  { value: "Neuroblastoma", label: "Neuroblastoma" },
  { value: "Epithelioid Sarcoma", label: "Epithelioid Sarcoma" },
  { value: "Giant Cell Lung Carcinoma", label: "Giant Cell Lung Carcinoma" },
  { value: "Esophageal Squamous Cell Carcinoma", label: "Esophageal Squamous Cell Carcinoma" },
  { value: "Ductal Breast Carcinoma", label: "Ductal Breast Carcinoma" },
  { value: "Head and Neck Squamous Cell Carcinoma", label: "Head and Neck Squamous Cell Carcinoma" },
  { value: "Adult T Acute Lymphoblastic Leukemia", label: "Adult T Acute Lymphoblastic Leukemia" },
  { value: "Bladder Carcinoma", label: "Bladder Carcinoma" },
  { value: "Renal Cell Carcinoma", label: "Renal Cell Carcinoma" },
  { value: "Non-Cancerous", label: "Non-Cancerous" },
  { value: "Chronic Myelogenous Leukemia", label: "Chronic Myelogenous Leukemia" },
  { value: "Pancreatic Ductal Adenocarcinoma", label: "Pancreatic Ductal Adenocarcinoma" },
  { value: "Plasma Cell Myeloma", label: "Plasma Cell Myeloma" },
  { value: "Adult Acute Myeloid Leukemia", label: "Adult Acute Myeloid Leukemia" },
  { value: "Pleural Epithelioid Mesothelioma", label: "Pleural Epithelioid Mesothelioma" },
  { value: "Childhood T Acute Lymphoblastic Leukemia", label: "Childhood T Acute Lymphoblastic Leukemia" },
  { value: "Anaplastic Large Cell Lymphoma", label: "Anaplastic Large Cell Lymphoma" },
  { value: "Colon Adenocarcinoma", label: "Colon Adenocarcinoma" },
  { value: "Amelanotic Melanoma", label: "Amelanotic Melanoma" },
  { value: "Clear Cell Renal Cell Carcinoma", label: "Clear Cell Renal Cell Carcinoma" },
  { value: "Gliosarcoma", label: "Gliosarcoma" },
  { value: "Astrocytoma", label: "Astrocytoma" },
  { value: "Colon Carcinoma", label: "Colon Carcinoma" },
  { value: "High Grade Ovarian Serous Adenocarcinoma", label: "High Grade Ovarian Serous Adenocarcinoma" },
  { value: "Salivary Gland Squamous Cell Carcinoma", label: "Salivary Gland Squamous Cell Carcinoma" },
  { value: "Childhood B Acute Lymphoblastic Leukemia", label: "Childhood B Acute Lymphoblastic Leukemia" },
  { value: "Breast Carcinoma", label: "Breast Carcinoma" },
  { value: "Epstein-Barr Virus-Related Burkitt's Lymphoma", label: "Epstein-Barr Virus-Related Burkitt's Lymphoma" },
  { value: "Diffuse Large B-Cell Lymphoma", label: "Diffuse Large B-Cell Lymphoma" },
  { value: "Medulloblastoma", label: "Medulloblastoma" },
  { value: "Burkitt's Lymphoma", label: "Burkitt's Lymphoma" },
  { value: "Skin Squamous Cell Carcinoma", label: "Skin Squamous Cell Carcinoma" },
  { value: "Gastric Small Cell Neuroendocrine Carcinoma", label: "Gastric Small Cell Neuroendocrine Carcinoma" },
  { value: "Chronic Eosinophilic Leukemia", label: "Chronic Eosinophilic Leukemia" },
  { value: "Intrahepatic Cholangiocarcinoma", label: "Intrahepatic Cholangiocarcinoma" },
  { value: "Gastric Adenocarcinoma", label: "Gastric Adenocarcinoma" },
  { value: "Mycosis Fungoides and Sezary Syndrome", label: "Mycosis Fungoides and Sezary Syndrome" },
  { value: "Hairy Cell Leukemia", label: "Hairy Cell Leukemia" },
  { value: "Erythroleukemia", label: "Erythroleukemia" },
  { value: "Duodenal Adenocarcinoma", label: "Duodenal Adenocarcinoma" },
  { value: "Gestational Choriocarcinoma", label: "Gestational Choriocarcinoma" },
  { value: "Mantle Cell Lymphoma", label: "Mantle Cell Lymphoma" },
  { value: "B-Cell Prolymphocytic Leukemia", label: "B-Cell Prolymphocytic Leukemia" },
  { value: "Childhood Acute Myeloid Leukemia with Maturation", label: "Childhood Acute Myeloid Leukemia with Maturation" },
  { value: "Anaplastic Astrocytoma", label: "Anaplastic Astrocytoma" },
  { value: "Chondrosarcoma", label: "Chondrosarcoma" },
  { value: "Acute Myelomonocytic Leukemia", label: "Acute Myelomonocytic Leukemia" },
  { value: "Hodgkin's Lymphoma", label: "Hodgkin's Lymphoma" },
  { value: "Prostate Carcinoma", label: "Prostate Carcinoma" },
  { value: "Cecum Adenocarcinoma", label: "Cecum Adenocarcinoma" },
  { value: "B-Cell Non-Hodgkin's Lymphoma", label: "B-Cell Non-Hodgkin's Lymphoma" },
  { value: "B Acute Lymphoblastic Leukemia", label: "B Acute Lymphoblastic Leukemia" },
  { value: "Adult Acute Monocytic Leukemia", label: "Adult Acute Monocytic Leukemia" },
  { value: "Pleural Biphasic Mesothelioma", label: "Pleural Biphasic Mesothelioma" },
  { value: "Childhood Acute Differentiated Monocytic Leukemia", label: "Childhood Acute Differentiated Monocytic Leukemia" },
  { value: "Adult B Acute Lymphoblastic Leukemia", label: "Adult B Acute Lymphoblastic Leukemia" },
  { value: "Testicular Embryonal Carcinoma", label: "Testicular Embryonal Carcinoma" },
  { value: "Gastric Carcinoma", label: "Gastric Carcinoma" },
  { value: "Large Cell Lung Carcinoma", label: "Large Cell Lung Carcinoma" },
  { value: "Acute Myeloid Leukemia", label: "Acute Myeloid Leukemia" },
  { value: "Lymphoma", label: "Lymphoma" },
  { value: "Gastric Choriocarcinoma", label: "Gastric Choriocarcinoma" },
  { value: "Osteosarcoma", label: "Osteosarcoma" },
  { value: "Vulvar Leiomyosarcoma", label: "Vulvar Leiomyosarcoma" },
  { value: "Primitive Neuroectodermal Tumor", label: "Primitive Neuroectodermal Tumor" },
  { value: "Uterine Corpus Leiomyosarcoma", label: "Uterine Corpus Leiomyosarcoma" },
  { value: "Childhood Precursor T Lymphoblastic Lymphoma", label: "Childhood Precursor T Lymphoblastic Lymphoma" },
  { value: "Fibrosarcoma", label: "Fibrosarcoma" },
  { value: "Liposarcoma", label: "Liposarcoma" },
  { value: "Vulvar Carcinoma", label: "Vulvar Carcinoma" },
  { value: "Undifferentiated Gallbladder Carcinoma", label: "Undifferentiated Gallbladder Carcinoma" },
  { value: "Precursor Lymphoblastic Lymphoma", label: "Precursor Lymphoblastic Lymphoma" },
  { value: "Follicular Lymphoma", label: "Follicular Lymphoma" },
  { value: "Pancreatic Adenocarcinoma", label: "Pancreatic Adenocarcinoma" },
  { value: "Thyroid Gland Anaplastic Carcinoma Squamous Cell", label: "Thyroid Gland Anaplastic Carcinoma Squamous Cell" },
  { value: "Endometrial Adenocarcinoma", label: "Endometrial Adenocarcinoma" },
  { value: "Adrenal Gland Neuroblastoma", label: "Adrenal Gland Neuroblastoma" },
  { value: "Invasive Ductal Carcinoma Not Otherwise Specified", label: "Invasive Ductal Carcinoma Not Otherwise Specified" },
  { value: "Tongue Squamous Cell Carcinoma", label: "Tongue Squamous Cell Carcinoma" },
  { value: "Primary Effusion Lymphoma", label: "Primary Effusion Lymphoma" },
  { value: "Ovarian Granulosa Cell Tumor", label: "Ovarian Granulosa Cell Tumor" },
  { value: "Follicular Thyroid Carcinoma", label: "Follicular Thyroid Carcinoma" },
  { value: "Vulvar Squamous Cell Carcinoma", label: "Vulvar Squamous Cell Carcinoma" },
  { value: "Rhabdomyosarcoma", label: "Rhabdomyosarcoma" },
  { value: "Undifferentiated Pleomorphic Sarcoma", label: "Undifferentiated Pleomorphic Sarcoma" },
  { value: "Adenosquamous Endometrial Carcinoma", label: "Adenosquamous Endometrial Carcinoma" },
  { value: "Natural Killer Cell Lymphoblastic Leukemia or Lymphoma", label: "Natural Killer Cell Lymphoblastic Leukemia or Lymphoma" },
  { value: "Ovarian Clear Cell Adenocarcinoma", label: "Ovarian Clear Cell Adenocarcinoma" },
  { value: "Signet Ring Cell Gastric Adenocarcinoma", label: "Signet Ring Cell Gastric Adenocarcinoma" },
  { value: "Acute Promyelocytic Leukemia", label: "Acute Promyelocytic Leukemia" },
  { value: "Acute Biphenotypic Leukemia", label: "Acute Biphenotypic Leukemia" },
  { value: "ONCOTREE_PRIMARY_DISEASE", label: "ONCOTREE_PRIMARY_DISEASE" },
  { value: "Splenic Marginal Zone B-Cell Lymphoma with Villous", label: "Splenic Marginal Zone B-Cell Lymphoma with Villous" },
  { value: "Hereditary Spherocytosis", label: "Hereditary Spherocytosis" },
  { value: "Gastric Tubular Adenocarcinoma", label: "Gastric Tubular Adenocarcinoma" },
  { value: "Gallbladder Carcinoma", label: "Gallbladder Carcinoma" },
  { value: "Vulvar Melanoma", label: "Vulvar Melanoma" },
  { value: "Cervical Small Cell Carcinoma", label: "Cervical Small Cell Carcinoma" },
  { value: "Alveolar Rhabdomyosarcoma", label: "Alveolar Rhabdomyosarcoma" },
  { value: "Synovial Sarcoma", label: "Synovial Sarcoma" },
  { value: "Cervical Squamous Cell Carcinoma", label: "Cervical Squamous Cell Carcinoma" },
  { value: "Human Papilloma Virus-Related Cervical Squamous Cell Carcinoma", label: "Human Papilloma Virus-Related Cervical Squamous Cell Carcinoma" },
  { value: "Bronchogenic Carcinoma", label: "Bronchogenic Carcinoma" },
  { value: "Squamous Cell Lung Carcinoma", label: "Squamous Cell Lung Carcinoma" },
  { value: "Pleural Sarcomatoid Mesothelioma", label: "Pleural Sarcomatoid Mesothelioma" },
  { value: "Gingival Squamous Cell Carcinoma", label: "Gingival Squamous Cell Carcinoma" },
  { value: "Lung Mucoepidermoid Carcinoma", label: "Lung Mucoepidermoid Carcinoma" },
  { value: "Oral Cavity Squamous Cell Carcinoma", label: "Oral Cavity Squamous Cell Carcinoma" },
  { value: "Pancreatic Carcinoma", label: "Pancreatic Carcinoma" },
  { value: "Papillary Renal Cell Carcinoma", label: "Papillary Renal Cell Carcinoma" },
  { value: "Cutaneous Melanoma", label: "Cutaneous Melanoma" },
  { value: "Ovarian Serous Cystadenocarcinoma", label: "Ovarian Serous Cystadenocarcinoma" },
  { value: "Breast Adenocarcinoma", label: "Breast Adenocarcinoma" },
  { value: "Ovarian Endometrioid Adenocarcinoma", label: "Ovarian Endometrioid Adenocarcinoma" },
  { value: "Thyroid Gland Anaplastic Carcinoma", label: "Thyroid Gland Anaplastic Carcinoma" },
  { value: "Pharyngeal Squamous Cell Carcinoma", label: "Pharyngeal Squamous Cell Carcinoma" },
  { value: "Cervical Carcinoma", label: "Cervical Carcinoma" },
  { value: "Ovarian Mucinous Adenocarcinoma", label: "Ovarian Mucinous Adenocarcinoma" },
  { value: "Hypopharyngeal Squamous Cell Carcinoma", label: "Hypopharyngeal Squamous Cell Carcinoma" },
  { value: "Endometrial Stromal Sarcoma", label: "Endometrial Stromal Sarcoma" },
  { value: "Squamous Cell Breast Carcinoma Acantholytic Variant", label: "Squamous Cell Breast Carcinoma Acantholytic Variant" },
  { value: "Hepatocellular Carcinoma", label: "Hepatocellular Carcinoma" },
  { value: "Epithelioid Cell Type Gastrointestinal Stromal Tumor", label: "Epithelioid Cell Type Gastrointestinal Stromal Tumor" },
  { value: "Rhabdoid Tumour of the Kidney", label: "Rhabdoid Tumour of the Kidney" },
  { value: "Askin's Tumor", label: "Askin's Tumor" },
  { value: "Uterine Corpus Sarcoma", label: "Uterine Corpus Sarcoma" },
  { value: "Gastric Adenosquamous Carcinoma", label: "Gastric Adenosquamous Carcinoma" },
  { value: "Adenosquamous Lung Carcinoma", label: "Adenosquamous Lung Carcinoma" },
  { value: "Papillary Lung Adenocarcinoma", label: "Papillary Lung Adenocarcinoma" },
  { value: "Ovarian Mixed Germ Cell Tumor", label: "Ovarian Mixed Germ Cell Tumor" },
  { value: "Ovarian Serous Adenocarcinoma", label: "Ovarian Serous Adenocarcinoma" },
  { value: "Embryonal Rhabdomyosarcoma", label: "Embryonal Rhabdomyosarcoma" },
  { value: "Adrenal Cortex Carcinoma", label: "Adrenal Cortex Carcinoma" },
  { value: "Rectal Adenocarcinoma", label: "Rectal Adenocarcinoma" },
  { value: "Esophageal Adenocarcinoma", label: "Esophageal Adenocarcinoma" },
  { value: "Barrett's Adenocarcinoma", label: "Barrett's Adenocarcinoma" },
  { value: "Renal Pelvis Urothelial Carcinoma", label: "Renal Pelvis Urothelial Carcinoma" },
  { value: "Hepatoblastoma", label: "Hepatoblastoma" },
  { value: "Oral Dysplasia", label: "Oral Dysplasia" },
  { value: "Papillary Thyroid Carcinoma", label: "Papillary Thyroid Carcinoma" },
  { value: "Benign Prostatic Hyperplasia", label: "Benign Prostatic Hyperplasia" },
  { value: "Hereditary Thyroid Gland Medullary Carcinoma", label: "Hereditary Thyroid Gland Medullary Carcinoma" },
  { value: "Endometrial Carcinoma", label: "Endometrial Carcinoma" },
  { value: "Malignant Pleural Mesothelioma", label: "Malignant Pleural Mesothelioma" },
  { value: "Parotid Gland Mucoepidermoid Carcinoma", label: "Parotid Gland Mucoepidermoid Carcinoma" },
  { value: "Oligodendroglioma", label: "Oligodendroglioma" },
  { value: "Laryngeal Squamous Cell Carcinoma", label: "Laryngeal Squamous Cell Carcinoma" },
  { value: "Ovarian Adenocarcinoma", label: "Ovarian Adenocarcinoma" },
  { value: "Pyriform Fossa Squamous Cell Carcinoma", label: "Pyriform Fossa Squamous Cell Carcinoma" },
  { value: "Cervical Adenocarcinoma", label: "Cervical Adenocarcinoma" },
  { value: "Pancreatic Adenosquamous Carcinoma", label: "Pancreatic Adenosquamous Carcinoma" },
  { value: "Ovarian Leiomyosarcoma", label: "Ovarian Leiomyosarcoma" },
  { value: "Pancreatic Somatostatinoma", label: "Pancreatic Somatostatinoma" },
  { value: "Lung Carcinoma", label: "Lung Carcinoma" },
  { value: "Ovarian Carcinoma", label: "Ovarian Carcinoma" },
  { value: "Ovarian Cystadenocarcinoma", label: "Ovarian Cystadenocarcinoma" },
  { value: "Childhood Acute Megakaryoblastic Leukemia", label: "Childhood Acute Megakaryoblastic Leukemia" },
  { value: "Mediastinal Thymic Large B-Cell Cell Lymphoma", label: "Mediastinal Thymic Large B-Cell Cell Lymphoma" },
  { value: "Gastric Fundus Carcinoma", label: "Gastric Fundus Carcinoma" },
  { value: "Colorectal Carcinoma", label: "Colorectal Carcinoma" },
  { value: "Sacral Chordoma", label: "Sacral Chordoma" },
  { value: "Myelodysplastic syndrome", label: "Myelodysplastic syndrome" },
  { value: "Squamous Papilloma", label: "Squamous Papilloma" },
  { value: "Mucinous Gastric Adenocarcinoma", label: "Mucinous Gastric Adenocarcinoma" },
  { value: "Cutaneous T-Cell Lymphoma", label: "Cutaneous T-Cell Lymphoma" },
  { value: "Chronic Lymphocytic Leukemia", label: "Chronic Lymphocytic Leukemia" },
  { value: "Adult Acute Megakaryoblastic Leukemia", label: "Adult Acute Megakaryoblastic Leukemia" }
]
const Drug_class_Categories = [
  { value: 'Behavior mechanisms', label: 'Behavior mechanisms' },
  { value: 'Cardiovascular', label: 'Cardiovascular' },
  { value: 'Chemically-Induced disorders', label: 'Chemically-Induced disorders' },
  { value: 'Congenital and neonatal', label: 'Congenital and neonatal' },
  { value: 'Digestive system', label: 'Digestive system' },
  { value: 'Endocrine system', label: 'Endocrine system' },
  { value: 'Eye', label: 'Eye' },
  { value: 'Female urogenital', label: 'Female urogenital' },
  { value: 'Genetic inborn', label: 'Genetic inborn' },
  { value: 'Hemic and lymphatic', label: 'Hemic and lymphatic' },
  { value: 'Immune system', label: 'Immune system' },
  { value: 'Infections', label: 'Infections' },
  { value: 'Male urogenital', label: 'Male urogenital' },
  { value: 'Mental disorders', label: 'Mental disorders' },
  { value: 'Musculoskeletal', label: 'Musculoskeletal' },
  { value: 'Neoplasm', label: 'Neoplasm' },
  { value: 'Nervous system', label: 'Nervous system' },
  { value: 'Nutritional and Metabolic', label: 'Nutritional and Metabolic' },
  { value: 'Occupational diseases', label: 'Occupational diseases' },
  { value: 'Otorhinolaryngologic', label: 'Otorhinolaryngologic' },
  { value: 'Pathological conditions', label: 'Pathological conditions' },
  { value: 'Respiratory tract', label: 'Respiratory tract' },
  { value: 'Skin and connective tissue', label: 'Skin and connective tissue' },
  { value: 'Stomatognathic', label: 'Stomatognathic' },
  { value: 'Wounds and injuries', label: 'Wounds and injuries' }
];

const Navbar = () => {


  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get the current theme

  const dispatch = useDispatch();
  const handleChange = (value) => {
    console.log("Selected:", value);
  };
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to toggle the theme
  };

  return (
   
      <header className={isDarkMode ? 'header-dark' : 'header-light'}>
        <Row className={isDarkMode ? 'navrow-dark' : 'navrow-light'}>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px', color: isDarkMode ? 'white' : 'black' }}>Add More</p>
            <CustomButton>200+</CustomButton>
            <CustomButton>200+</CustomButton>
          </Col>

          <Col>
            <SelectComponent
              options={Tissues}
              placeholder="Tissues"
              handleChange={handleChange}
              dropwidth="100px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={Max_clinical}
              placeholder="Max clinical phase"
              handleChange={handleChange}
              dropwidth="150px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={GDSC1}
              placeholder="GDSC1"
              handleChange={handleChange}
              dropwidth="100px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={PIC50}
              placeholder="PIC50"
              handleChange={handleChange}
              dropwidth="90px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={Cell_line}
              placeholder="Cell line lineage"
              handleChange={handleChange}
              dropwidth="150px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={Drug_class_Categories}
              placeholder="Disease class"
              handleChange={handleChange}
              dropwidth="120px"
            />
          </Col>
          <Col>
            <SelectComponent
              options={Compound_class}
              placeholder="Compound class"
              handleChange={handleChange}
              dropwidth="150px"
            />
          </Col>
          <Col>
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={isDarkMode} // Bind the switch to the current theme mode
              onChange={handleThemeToggle} // Call the toggle handler when switched
            />
            <CustomButton>Soon</CustomButton>
            <CustomButton>Apply Filter</CustomButton>
          </Col>
        </Row>
      </header>
  );
};

export default Navbar;
