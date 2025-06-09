import loadAnimation from '../../assets/load-animation.gif';

const Loader = () => (
  <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40">
    <img src={loadAnimation} alt="Loading..." className="w-20 h-20" />
  </div>
);

export default Loader;
