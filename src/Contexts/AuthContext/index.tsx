import { createContext, useState } from "react";
import {
  iAnnouncementProps,
  iAuthContext,
  iAuthProviderProps,
  iCepProps,
  iUserProps,
  iAddressProps,
} from "./@types";
import { useNavigate } from "react-router-dom";
import { iRegisterFormValues } from "../../Components/Form/FormRegister/@types";
import { api, cepApi } from "../../Services";
import { iLogin } from "../../Components/Form/FormLogin/loginSchema";
import { toast } from "react-toastify";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { iProfileEditProps } from "../../Components/Form/FromProfileEdit/@types";

export const AuthContext = createContext({} as iAuthContext);
export const AuthProvider = ({ children }: iAuthProviderProps) => {
  const [typeModal, setTypeModal] = useState<string>("");
  const [cep, setCep] = useState<iCepProps | null>(null);
  const [user, setUser] = useState<iUserProps | null>(null);
  const [announcementId, setAnnouncementId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<iAnnouncementProps | null>(
    null
  );
  const [userAnnouncements, setUserAnnouncements] = useState<
    iAnnouncementProps[] | []
  >([]);
  const [allAnnouncements, setAllAnnouncements] = useState<
    iAnnouncementProps[] | []
  >([]);
  const [filter, setFilter] = useState<[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const cookies = parseCookies();
  const { user_token, user_email } = cookies;

  const userLogin = async (data: iLogin) => {
    const id = toast.loading("Verificando dados...");
    try {
      const request = await api.post("login", data);
      if (request) {
        api.defaults.headers.common.authorization = `Bearer ${request.data.token}`;
        toast.update(id, {
          render: "Login realizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setCookie(null, "user_token", request.data.token);
        setCookie(null, "user_email", data.email);
        navigate("");
        await getUserData();
      }
    } catch (error) {
      toast.update(id, {
        render: "Informações invalidas",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const userRegister = async (
    data: iRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const request = await api.post("users", data);
      if (request.statusText === "Created") {
        setUser(request.data);
        setIsOpen(true);
      }
      return request.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userUpdateProfile = async (
    data: iProfileEditProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string | undefined
  ) => {
    const id = toast.loading("Verificando dados...");
    try {
      setLoading(true);
      const request = await api.patch(`users/${userId}`, data);
      if (request.statusText === "OK") {
        toast.update(id, {
          render: "Usuário atualizado com sucesso",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });
        setUser(request.data);
      }
    } catch (error) {
      toast.update(id, {
        render: "Informações invalidas",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const userDeleteProfile = async (
    userId: string | undefined,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const id = toast.loading("Verificando dados...");
    try {
      setLoading(true);
      const request = await api.delete(`users/${userId}`);
      if (request.statusText === "No Content") {
        destroyCookie(null, "user_token");
        destroyCookie(null, "user_email");
        toast.update(id, {
          render: "Usuário deletado com sucesso",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });

        navigate("/");
        return;
      }
    } catch (error) {
      toast.update(id, {
        render: "Foi impossível deletar o usuário",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    const id = toast.loading("Verificando dados...");
    setUser(null);
    destroyCookie(null, "user_token");
    destroyCookie(null, "user_email");
    toast.update(id, {
      render: "Volte sempre!",
      type: "success",
      autoClose: 1000,
      isLoading: false,
    });
    navigate("");
  };

  const getUserData = async () => {
    try {
      const request = await api.get("users");

      const data = await request.data;
      const find_user = data.filter(
        (el: iUserProps) => el.email === user_email
      );
      return setUser(find_user[0]);
    } catch (error) {
      console.log("erro catch getUser", error);
    }
  };

  const getUserAnnouncement = async (userId: string) => {
    try {
      const request = await api.get("announcement");
      const data = await request.data;

      const find_user_announcements = data.filter((el: iAnnouncementProps) => {
        return el.userId === userId;
      });
      setUserAnnouncements(find_user_announcements);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAnnouncement = async () => {
    try {
      const request = await api.get("announcement");
      const data = await request.data;
      setAllAnnouncements(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnnouncementsFiltered = async () => {
    try {
      const request = await api.get(`announcement?group=brand`);
      const data = await request.data;
      console.log(Object.keys(data));
      // setFilter()
      // setAllAnnouncements(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnnouncementById = async (
    announcementId: string
  ): Promise<iAnnouncementProps | void> => {
    try {
      const request = await api.get(`/announcement/${announcementId}`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      const data = request.data;
      console.log(data);
      return setAnnouncement(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editAddress = async (
    data: iAddressProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    const userId = user?.id;
    const id = toast.loading("Verificando dados...");
    try {
      setLoading(true);
      const request = await api.patch(`users/${userId}`, { address: data });
      if (request) {
        toast.update(id, {
          render: "Endereço atualizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
      setUser(request.data);
      setIsOpen(false);
    } catch (error) {
      toast.update(id, {
        render: "Informações invalidas",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (announcementId: string): Promise<void> => {
    try {
      await api.delete(`announcement/${announcementId}`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });

      const findAnnouncements = userAnnouncements.filter(
        (el: iAnnouncementProps) => {
          return el.id !== announcementId;
        }
      );

      setUserAnnouncements(findAnnouncements);
      toast.success("Anúncio excluído com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir o anúncio.");
    }
  };

  const authCep = async (value: string) => {
    try {
      const valueCep = value;
      let newValue = "";
      if (valueCep.length === 8) {
        newValue = valueCep.substring(5, 0) + "-" + valueCep.substring(5);
      }
      const cepRequest = await cepApi.get(`${newValue}/json`);
      if (cepRequest.statusText === "OK") {
        setCep(cepRequest.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        cep,
        setCep,
        user,
        setUser,
        userRegister,
        userLogin,
        navigate,
        getUserData,
        authCep,
        filter,
        setFilter,
        isOpen,
        setIsOpen,
        userLogout,
        getUserAnnouncement,
        userAnnouncements,
        getAllAnnouncement,
        allAnnouncements,
        getAnnouncementById,
        announcement,
        user_token,
        setAnnouncementId,
        announcementId,
        userUpdateProfile,
        editAddress,
        typeModal,
        setTypeModal,
        deleteAnnouncement,
        userDeleteProfile,
        setAnnouncement,
        getAnnouncementsFiltered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
