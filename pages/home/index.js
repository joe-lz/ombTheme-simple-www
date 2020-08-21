import Head from "next/head";
import AV from "leancloud-storage";
import dynamic from "next/dynamic";
import { Tree, Button, notification, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";
import Layout from "src/components/www/Layout";
import ArticleItem from "src/components/www/ArticleItem";
import NoData from "src/components/www/NoData";
import { getArticleList } from "src/service/article";

function MyComponent() {
  const [menus, setmenus] = useState(null);
  const [articleLists, setarticleLists] = useState(null);

  const getlist = async (params = {}) => {
    const resList = await getArticleList({ status: 3, ...params });
    setarticleLists(resList);
  };

  const onSelect = async (select, info) => {
    const obj = {
      title: info.node.title,
      key: info.node.key,
    };
    let category_1_key = null;
    let category_2_key = null;
    menus.value.map((cate1Obj) => {
      if (cate1Obj.key === obj.key) {
        category_1_key = obj.key;
      }
      if (cate1Obj.children) {
        cate1Obj.children.map((cate2Obj) => {
          if (cate2Obj.key === obj.key) {
            category_1_key = cate1Obj.key;
            category_2_key = obj.key;
          }
        });
      }
    });
    await getlist(
      Object.assign(
        { category_1_key },
        category_2_key ? { category_2_key } : {}
      )
    );
  };

  useEffect(() => {
    async function fetchData() {
      await getlist();
    }
    fetchData();
  }, []);

  return (
    <Layout
      onChange={(params) => {
        console.log(params.menus);
        setmenus(params.menus);
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.list}>
            {articleLists &&
              articleLists.length > 0 &&
              articleLists.map((obj) => {
                return <ArticleItem key={obj.id} data={obj.toJSON()} />;
              })}
            {articleLists && articleLists.length === 0 && <NoData />}
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.category_content}>
            <div className={styles.category_content_title}>目录</div>
            <div className={styles.category_content_body}>
              {menus && (
                <Tree
                  showLine
                  defaultExpandAll
                  treeData={menus.value}
                  onSelect={onSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyComponent;
