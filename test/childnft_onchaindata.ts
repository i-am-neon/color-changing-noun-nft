import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";
import { ERC721Base, NeonsColorChangingNoun, TestBase } from "../typechain";

describe("NeonsColorChangingNoun", () => {
  let signer: SignerWithAddress;
  let signerAddress: string;
  let childNft: NeonsColorChangingNoun;
  let baseNft: ERC721Base;

  beforeEach(async () => {
    const { NeonsColorChangingNoun } = await deployments.fixture([
      "ERC721Base",
      "NeonsColorChangingNoun",
    ]);

    childNft = (await ethers.getContractAt(
      "NeonsColorChangingNoun",
      NeonsColorChangingNoun.address
    )) as NeonsColorChangingNoun;
    baseNft = (await ethers.getContractAt(
      "TestBase",
      NeonsColorChangingNoun.address
    )) as TestBase;

    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
  });

  it("mints", async () => {
    await childNft.mint(JSON.stringify({name: "amazing", description: "on-chain content"}));
    expect(await baseNft.ownerOf(0)).to.be.equal(signerAddress)
    expect(await baseNft.name()).to.be.equal('Constitution Words');
    await baseNft.burn(0);
    await childNft.mint(JSON.stringify({name: "amazing", description: "on-chain content"}));
    await childNft.mint(JSON.stringify({name: "amazing", description: "on-chain content"}));
    await baseNft.setApprovalForAll(ethers.constants.AddressZero, true);
  });
});
