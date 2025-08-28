import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Company Name with Link */}
        <div>
            <div style={styles.urlHolder}>
            Developed by
            <a 
          href="https://bioicawtech.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={styles.companyLink}
        >
          bioicawtech.com
        </a>
        </div>
        </div>

        {/* Mailing Address */}
        <div>
        Reach out to us at
        <a href="mailto:info@example.com?subject=Hello&body=I want to know more about your services" style={styles.address}>
        info@bioicawtech.com
        </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "rgb(40, 165, 251)",
    color: "white",
    padding: "10px",
    
  },
  container: {
    maxWidth: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around",
    textAlign: "center",
  },
  urlHolder: {
    fontSize: "18px",
    fontWeight: "400",
    textDecoration: "none",
    color: "white",
    marginBottom: "8px",
    
  },
  companyLink: {
    fontSize: "18px",
    fontWeight: "600",
    textDecoration: "none",
    color: "white",
    marginBottom: "8px",
    marginLeft: "8px",
  },
  address: {
    marginLeft: "10px",
    fontSize: "14px",
    margin: 0,
    textDecoration:"none",
    color:"white",
  }
};

export default Footer;
