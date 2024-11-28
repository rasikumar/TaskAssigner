import Instance from "@/API/Instance";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const responseName = async () => {
      try {
        const response = await Instance.get("/admin/dashboard/");
        setName(response.data.data.mail);
      } catch (error) {
        console.error(error);
      }
    };
    responseName();
  }, []);
  return (
    <div>
      Welcome, Please enter your name to proceed.{name}
      <h1>sdDSA</h1>
      <div>asdas</div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <button>asas</button>
          <a href="https://docs.google.com/spreadsheets/d/1AJwe9vJesWsagMTpPvc-aRZcEx6rwh-bKM1zRi6aNj8/edit?gid=862513931#gid=862513931">asas</a>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;