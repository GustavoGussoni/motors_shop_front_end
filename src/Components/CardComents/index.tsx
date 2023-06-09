export const CardComents = ({ user }: any) => {

  const GetFirstLetterOfEachWord = (username: string) => {
    const words = username.split(' ');
    const firstWords = words.map((word) => word.charAt(0));
    return firstWords.join('');
  };

  const calculateElapsedTime = (publicationDate: Date): string => {
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - publicationDate.getTime();

    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ano${years > 1 ? 's' : ''} atrás`;
    } else if (months > 0) {
      return `${months} mês${months > 1 ? 'es' : ''} atrás`;
    } else if (days > 0) {
      return `${days} dia${days > 1 ? 's' : ''} atrás`;
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    } else if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    } else {
      return `${seconds} segundo${seconds > 1 ? 's' : ''} atrás`;
    }
  }

  const getRandomColorClass = (): string => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-teal-500',
      'bg-indigo-500',
      'bg-gray-500',
      'bg-orange-500',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const randomColorClass = getRandomColorClass();

  return (
    <li className="flex gap-2 flex-col">
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-8 h-8 ${randomColorClass} flex items-center justify-center`}>
          <p className="text-center text-white font-medium text-sm flex items-center justify-center">
            {GetFirstLetterOfEachWord(user.username)}
          </p>
        </div>
        <h2 className="text-grey-1 text-sm font-medium">{user.username}</h2>
        <span className="flex justify-center items-center gap-2 font-normal text-grey-3 text-xs">
          <div className="rounded-full w-1 h-1 text-center font-normal bg-grey-3"></div>
          {calculateElapsedTime(user.createdAt)}
        </span>
      </div>
      <p className="font-normal text-grey-2 text-sm">{user.description}</p>
    </li>
  );
};