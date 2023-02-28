import BreadCrumb from "components/BreadCrumb";
import { globalContextType } from "context/@types.global";
import { GlobalContext } from "context/GlobalContext";
import useGetUserProfile from "hooks/useGetUserProfile";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import { isEmpty } from "lodash-es";
import dynamic from "next/dynamic";
import { ReactNode, useContext, useMemo } from "react";
import { serviceStatus } from "services/constants";
import { allowPage } from "utils/constants";
import styles from "./DefaultLayout.module.css";

type Props = {
  children?: ReactNode;
  pageName?: String;
};

const DefaultLayout = ({ children, pageName }: Props) => {
  const { users = {} as any, setUser } = useContext(
    GlobalContext
  ) as globalContextType;
  const str: string = String(pageName);
  const isHaveUser =
    users?.statusCode !== serviceStatus?.UNAUTHORIZED && !isEmpty(users);

  useGetUserProfile({ pageName });

  if (allowPage.includes(str) || isHaveUser)
    return (
      <div>
        <Header users={isHaveUser ? users : undefined} setUser={setUser} />
        <main className={styles.container}>{children}</main>
        <Footer />
      </div>
    );

  return <></>;
};

export default dynamic(() => Promise.resolve(DefaultLayout), {
  ssr: false,
});
