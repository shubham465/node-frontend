import loadAnimation from '../../assets/load-animation.gif';

const Loader = () => (
  <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40">
    <img src={loadAnimation} alt="Loading..." className="w-45 h-45" />
  </div>
);

export default Loader;
