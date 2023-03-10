import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleTask, SimpleTask__factory} from "../typechain-types";

describe("SimpleTask", function() {
    async function deploy() {
      const [ owner, user ] = await ethers.getSigners();
  
      const SampleFactory = await ethers.getContractFactory("SimpleTask");
      const task : SimpleTask = await SampleFactory.deploy(
        owner.address,
        "SimpleTask"
      );
      await task.deployed();
  
      return { task, owner, user }
    }
  
    it("allows to call storeMessage() and getMessage() ", async function() {
        const { task } = await loadFixture(deploy);
    
        const tx = await task.storeMessage("hi");
        await tx.wait();
    
        expect(await task.getMessage()).to.eq("hi");
    });

    it("allows to call rename() and getName() ", async function() {
      const { task } = await loadFixture(deploy);
  
      const tx = await task.rename("SmartContract");
      await tx.wait();
  
      expect(await task.getName()).to.eq("SmartContract");
  });

  it("allows to call setOwner() and getOwner() ", async function() {
    const { task, user } = await loadFixture(deploy);
    const tx = await task.setOwner(user.address);
    await tx.wait();

    expect(await task.getOwner()).to.eq(user.address);
  });

  it("reverts call to setOwner() ", async function() {
    const { task, user } = await loadFixture(deploy);
    
    await expect(
      SimpleTask__factory.connect(task.address, user).rename("NewName")
    ).to.be.revertedWith("You are not owner!!!");
  });

  it("reverts call to rename() ", async function() {
    const { task, user } = await loadFixture(deploy);
    
    await expect(
      SimpleTask__factory.connect(task.address, user).setOwner(user.address)
    ).to.be.revertedWith("You are not owner!!!");
  });
});