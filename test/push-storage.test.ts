import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PushStorage", function () {
  async function pushFixture() {
    const [owner, acc1, acc2, acc3] = await ethers.getSigners();

    const pushStorage = await (await ethers.getContractFactory("PushStorage")).deploy();

    return { pushStorage, owner, acc1, acc2, acc3 };
  }

    it('Push data saved correctly', async function () {
      const { pushStorage, acc1, acc2 } = await loadFixture(pushFixture);

      await pushStorage.connect(acc1).write(acc2, "hello")

      const data = await pushStorage.read(acc2.address);

      expect(data[0].toLowerCase()).equal(acc1.address.toLowerCase());
      expect(data[1]).equal('hello');
    });

    it('Push creator can update data', async function () {
      const { pushStorage, acc1, acc2 } = await loadFixture(pushFixture);

      await pushStorage.connect(acc1).write(acc2, "hello")

      let data = await pushStorage.read(acc2.address);
      expect(data[1]).equal('hello');

      await pushStorage.connect(acc1).write(acc2, "world")

      data = await pushStorage.read(acc2.address);
      expect(data[1]).equal('world');
    });

    it(`Push update restricted for not owner`, async function () {
      const { pushStorage, acc1, acc2, acc3 } = await loadFixture(pushFixture);

      await pushStorage.connect(acc1).write(acc2, "hello")

      await expect(pushStorage.connect(acc3).write(acc2, "world")).to.be.revertedWith('not_push_creator');
    });
});