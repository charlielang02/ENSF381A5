import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} LMS. All Rights Reserved.</p>
    </footer>
  );
};

const styles = {
  footer: { textAlign: "center", padding: "10px", background: "#004080", color: "white" },
};

export default Footer;
