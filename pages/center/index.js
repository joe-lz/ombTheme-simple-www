import Head from "next/head";
import AV from "leancloud-storage";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import Layout from "src/components/www/Layout";

function MyComponent() {
  const [profile, setprofile] = useState(null);
  const [userinfo, setuserinfo] = useState(null);
  return (
    <Layout
      onChange={(params) => {
        setprofile(params.profile);
        setuserinfo(params.userinfo);
      }}
    >
      <div>cdsc</div>
    </Layout>
  );
}

export default MyComponent;
