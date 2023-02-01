import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
    event.preventDefault();
    // Grab contract from state
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = ethers.utils.parseEther("0.001");
    const tx = await contract.buy(name, message, { value: amount });
    const txReceipt = await tx.wait();
    console.log(`Transaction Completed ${txReceipt}`);
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyCoffee}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};
export default Buy;
