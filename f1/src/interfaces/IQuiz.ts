// Eksporterer et grensesnitt (interface) kalt IQuiz som definerer strukturen for Quiz-contextverdien
export interface IQuiz {
  // Variabel for indeksen til gjeldende spørsmål i quizen
  currentQuestionIndex: number;

  // Funksjon for å oppdatere indeksen til gjeldende spørsmål i quizen
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

  // Variabel for å lagre brukerens poeng i quizen
  score: number;

  // Funksjon for å oppdatere brukerens poeng i quizen
  setScore: React.Dispatch<React.SetStateAction<number>>;

  // Variabel for å spore om quizen er ferdig eller ikke
  isQuizFinished: boolean;

  // Funksjon for å oppdatere om quizen er ferdig eller ikke
  setIsQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
}
