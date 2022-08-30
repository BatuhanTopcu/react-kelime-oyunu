import React from 'react';
import { useOutsideAlerter } from '../hooks/generalHooks';

type InfoBoxProps = {
  handleClose: () => void;
};

export default function InfoBox({ handleClose }: InfoBoxProps) {
  const divRef = useOutsideAlerter(handleClose);
  return (
    <div
      ref={divRef}
      className="bg-slate-200 z-10 abs-center w-full max-w-lg rounded-3xl drop-shadow-md py-2 px-4 hover:drop-shadow-xl tra-300"
    >
      <div className="flex justify-center relative text-2xl font-bold mb-2">
        <h2 className="font-secular drop-shadow-dark-less">Bilgi</h2>
        <button onClick={handleClose} type="button" className="absolute right-0 top-0 tra-200 hover:text-red-600">
          &#10005;
        </button>
      </div>
      <div>
        Oyun, kelimenin son harfinden yeni bir kelime türeterek oynanıyor. Kelime içeriğimizin Türkçe isimler olduğunu
        varsayarsak şöyle bir sequence oluşuyor;
        <br /> **Hasan &gt; Niyazi &gt; İbrahim &gt; Mustafa &gt; Ahmet &gt; …**
      </div>
      <div className="flex justify-center mt-2">
        <a
          className="font-bold font-secular text-blue-800 hover:text-blue-600 tra-200"
          target="_blank"
          href="mailto:batuhantopcu17@gmail.com"
          rel="noreferrer"
        >
          Batuhan Topçu
        </a>
      </div>
    </div>
  );
}
