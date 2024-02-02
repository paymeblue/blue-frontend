import dynamic from "next/dynamic";

const Download = dynamic(() => import("./download"));

const DownloadPage = () => <Download />;

export default DownloadPage;
