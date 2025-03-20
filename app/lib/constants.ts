// const USE_SANDBOX = true;
const USE_SANDBOX = process.env.NODE_ENV === "development";

export const DOJAH_APP_ID = "65687f5182d14d00405ca29c";

export const DOJAH_PUBLIC_KEY = USE_SANDBOX
  ? "test_pk_lRMxOxymUiSXppBSj1Tzsq3Nl"
  : "prod_pk_z3PlcZdMCy7XJqZsqcqYDzPhI";

export const DOJAH_WIDGET_ID = USE_SANDBOX
  ? "65731f462d489d00417a1b64"
  : "657c1f06830cf00040fcac52";

export const DOJAH_WIDGET_ID_BUSINESS_INTERMEDIATE = USE_SANDBOX
  ? "65ddf435dd3ad4003f2b8311"
  : "65d8b567a264e90040fe7a10";
export const DOJAH_WIDGET_ID_BUSINESS_PRO = USE_SANDBOX
  ? "65ddf46ddd3ad4003f2b8358"
  : "65d8f120f2409c004005c52d";

export const DOJAH_WIDGET_ID_BUSINESS_OWNER_VERIFICATION = USE_SANDBOX
  ? "67dc5ebfbe04bb9c246209cf"
  : "67dc59abbe04bb9c2460c85c";
