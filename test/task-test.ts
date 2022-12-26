import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleTask, SimpleTask__factory } from "../typechain-types";

describe("SimpleTask", function() {
    async function deploy() {
      const [ owner, user ] = await ethers.getSigners();
  
      const SampleFactory = await ethers.getContractFactory("SimpleTask");
      const task = await SampleFactory.deploy();
      await task.deployed();
  
      return { task, owner, user }
    }
  
    it("allows to call storeMessage() and getMessage() ", async function() {
        const { task } = await loadFixture(deploy);
    
        const tx = await task.storeMessage("hi");
        await tx.wait();
    
        expect(await task.getMessage()).to.eq("hi");
    });


  });