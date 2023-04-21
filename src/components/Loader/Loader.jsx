import { Dna } from 'react-loader-spinner';
import css from './Loader.module.css';
export const Loader = () => {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{
        display: 'flex',
      }}
      wrapperClass={css.loader}
    />
  );
};
