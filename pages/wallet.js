import "@/styles/Wallet.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateWallet, resetWallet } from "@/store/walletSlice";
import { useNotification } from "@/contexts/NotificationContext";
import ProjectItem from "@/components/ProjectItem";

const Wallet = () => {
  const [isLandscape, setIsLandScape] = useState(false);
  const dispatch = useDispatch();

  const { wallet } = useSelector((state) => state.wallet);

  const { projects } = useSelector((state) => state.mine);

  const { showNotification } = useNotification();

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandScape(true);
    }
  }, []);

  const connectWallet = () => {
    if (!wallet.id) {
      dispatch(updateWallet({ id: "0x123EFABC2334W", balance: 1000 })); // later make call to real wallet api
    } else {
      showNotification("You are already connected", "info", 4000);
    }
  };
  return (
    <div
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      {!wallet.id ? (
        // show connect button when user hasn't connected yet
        <div className="connect-but-container h-screen flex items-center justify-center">
          <button
            onClick={connectWallet}
            className="rounded-lg px-12 py-4 text-white bg-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all"
          >
            Connect
          </button>
        </div>
      ) : (
        // wallet details and minted projects
        <div>
          <div className="ml-auto border-2 border-white rounded-lg text-ellipsis max-w-64 py-2 px-4 mt-4 mr-2 text-center text-white bg-white bg-opacity-30 mb-24">
            {wallet.id}
          </div>

          {/* balance */}
          <div className="text-white text-5xl font-bergen font-bold mx-auto text-center mb-12">
            {wallet.balance} SOL
          </div>

          {/* Receive and send buttons */}
          <div className="flex justify-between mt-8 max-w-[300px] mx-auto">
            <button className="rounded-lg px-2 py-2 w-5/12 text-white bg-transparent border-2 border-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all">
              Receive
            </button>
            <button className="rounded-lg px-2 py-2 w-5/12 text-white bg-app-pink bg-opacity-50 text-2xl shadow-lg hover:bg-opacity-60 transition-all ml-4">
              Send
            </button>
          </div>

          {/* minted projects */}
          <div className="px-4">
            <div className="text-white text-2xl font-bergen font-bold mx-auto text-center mt-12">
              Minted Projects
            </div>
            {projects.slice(0, 5).map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
