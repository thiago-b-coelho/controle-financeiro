import * as S from "../../styles/style"
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <S.LoaderContainer>
          <BeatLoader loading size={15} color="#299D91"/>
    </S.LoaderContainer>
  )
}

export default Loader