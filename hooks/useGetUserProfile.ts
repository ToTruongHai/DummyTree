import { globalContextType } from "context/@types.global";
import { GlobalContext } from "context/GlobalContext";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { getUserProfile } from "services/Authentication.service";
import ClientCache from "services/clientCache";
import { allowPage } from "utils/constants";

type Props = {
  pageName?: String;
};

const useGetUserProfile = ({ pageName }: Props) => {
  const router = useRouter();
  const { users, setUser } =
    (useContext(GlobalContext) as globalContextType) ?? {};

  useEffect(() => {
    const tokenCookie = ClientCache.getAuthenticationWithCookie();

    const page = allowPage;
    const str: string = String(pageName);

    if (tokenCookie === null) {
      if (page.includes(str)) return;

      ClientCache.removeAuthenTokenWithCookie();
      router.push({
        pathname: "/login",
        query: {
          redirectPath: router?.route,
        },
      });
    }

    const { id_token } = tokenCookie ?? {};

    getUserProfile(id_token?.token)
      .then((data) => {
        if (isEmpty(users)) return setUser(data);
        if (data?.name === users?.name) return;
        return setUser(undefined);
      })
      .catch((error) => {
        ClientCache.removeAuthenTokenWithCookie();
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName]);
};

export default useGetUserProfile;
