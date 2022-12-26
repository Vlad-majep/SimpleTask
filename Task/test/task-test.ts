import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Task", function() {
    async function deploy() {
      const [ owner, user ] = await ethers.getSigners();
  
      const SampleFactory = await ethers.getContractFactory("Task");
      const task = await SampleFactory.deploy();
      await task.deployed();
  
      return { task, owner, user }
    }
  
    it("allows to call storeMessage()", async function() {
        const { task } = await loadFixture(deploy);
    
        const tx = await task.storeMessage("hi");
        await tx.wait();
    
        expect(await task.getMessage()).to.eq("hi");
    });
  });