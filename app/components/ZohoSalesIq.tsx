// components/ZohoSalesIQ.js
"use client";
import { useEffect } from "react";

const ZohoSalesIQ = () => {
  useEffect(() => {
    // Ensure script is not added multiple times
    if (document.getElementById("zsiqscript")) return;

    const zohoScript = document.createElement("script");
    zohoScript.id = "zsiqscript";
    zohoScript.src =
      "https://salesiq.zohopublic.com/widget?wc=siqec5c81b2e03e130ef17705e87151c0ab";
    zohoScript.defer = true;

    const zohoInitScript = document.createElement("script");
    zohoInitScript.innerHTML = `
      window.$zoho=window.$zoho || {};
      $zoho.salesiq = $zoho.salesiq || {ready: function(){}};
    `;

    document.body.appendChild(zohoInitScript);
    document.body.appendChild(zohoScript);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(zohoInitScript);
      document.body.removeChild(zohoScript);
    };
  }, []);

  return null;
};

export default ZohoSalesIQ;
