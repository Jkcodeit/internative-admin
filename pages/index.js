import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Home() {
  const router = useRouter();
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    // Always do navigations after the first render
    if (jwt === "") {
      var data = localStorage.getItem("jwt-token");
      console.log(data);
      if (data !== null) {
        router.push("/home", undefined, { shallow: true });
      } else {
        router.push("/login", undefined, { shallow: true });
      }
      // navigate("/home");
      setJwt(data);
    }
  }, [jwt]);

  return <div></div>;
}
