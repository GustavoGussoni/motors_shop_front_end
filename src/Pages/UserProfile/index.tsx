import { Header } from "../../Components/Header";
import { HeadingText } from "../../Style/HeadingText";
import { HeadingTextBody } from "../../Style/HeadingBodyText";
import { Footer } from "../../Components/Footer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Card } from "../../Components/Card";

export const UserProfile = () => {
  const { getUserData, user, getAnnouncement, userAnnouncements } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        await getUserData();

        setIsLoading(false);
        console.log(userAnnouncements);
      } catch (error) {
        setIsLoading(false);
        return error;
      }
    };
    getUser();
  }, []);

  const GetFirstLetterOfEachWord = (username: string) => {
    const words = username.split(" ");
    const firstWords = words.map((word) => word.charAt(0));
    return firstWords.join("");
  };
  if (isLoading || !user) {
    return (
      <div className="bg-gray-100 max-h-full">
        <Header />
        <div className="relative z-[1] bg-brand-1 h-[17rem]" />
        <div className="bg-gray-100 absolute top-[78px] h-[100vh] w-full">
          <main>
            <HeadingText className="z-[2] text-white" tag="heading-6-600">
              Carregando...
            </HeadingText>
          </main>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 max-h-full">
      <Header />
      <div className="relative z-[1] bg-brand-1 h-[17rem]" />
      <div className="bg-gray-100 absolute top-[78px] h-[100vh] w-full">
        <main className="bg-gray-100">
          <div className="bg-white z-[2] flex flex-col items-start gap-8 w-full py-[40px] px-[28px] sm:px-[44px] sm:py-[36px] h-auto sm:flex sm:justify-center">
            <div className="w-[104px] h-[104px] flex items-center justify-center rounded-full bg-brand-1 text-3xl text-white-fixed">
              {GetFirstLetterOfEachWord(user.name)}
            </div>
            <div>
              <HeadingText tag="heading-6-600">{user.name}</HeadingText>
            </div>

            <HeadingTextBody
              tag="body-1-400"
              className="w-[100%] text-start text-grey-2 sm:max-w-[352px]"
            >
              {user.description}
            </HeadingTextBody>
          </div>
        </main>
        <div className="flex bg-gray-100 flex-col sm:justify-between sm:w-full">
          <div className="flex px-14 items-center justify-between w-full">
            <h1 className="text-heading-5 font-600 font-sans leading-8">
              Anúncios
            </h1>
          </div>
          <main>
            <ul className="flex flex-nowrap justify-between flex-row gap-4 overflow-x-auto sm:w-full sm:gap-2 sm:max-w-full sm:h-full sm:items-start sm:flex-wrap sm:overflow-x-hidden">
              {userAnnouncements ? (
                userAnnouncements.map((an) => {
                  return <Card key={an.id} data={an} />;
                })
              ) : (
                <li>Sem anúncios cadastrados</li>
              )}
            </ul>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};
