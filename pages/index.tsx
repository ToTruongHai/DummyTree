import type { ReactElement } from "react";
import { DefaultLayout } from "../layouts";
import HomePage from "../modules/HomePage";
import type { NextPageWithLayout } from "./_app";
import "i18n";

const Page: NextPageWithLayout = ({ users }: any) => {
  return <HomePage users={users} />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

Page.pageName = "homePage";

export default Page;
