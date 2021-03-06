
import Head from "next/head"
import Link from "next/link"

import Web3Modal from "web3modal"
import { useState, useEffect } from "react"
import { ethers } from "ethers"



import {
    nftMarketAddress, tokenXYBaddress
} from '../../config'

import Market from '../../abi/nftmarket.json'
import xybToken from "../../abi/xybToken.json"

export default function NftMarket() {

    const [nfts, setNfts] = useState([])
    const [metaMask, setMetaMask] = useState()
    useEffect(() => {
        let isMetaMaskInstalled = () => {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };
        const metaMask = isMetaMaskInstalled()
        setMetaMask(metaMask)
        loadNFTs()
    }, [])

    async function chu_mo(num) {

        var btn1 = document.querySelectorAll(".photo_list_photo_button");
        btn1[num].style.display = "block";
        return false;

    }

    async function li_kai(num) {
        var btn1 = document.querySelectorAll(".photo_list_photo_button");
        btn1[num].style.display = "none";
        return false;

    }

    async function li1(e, name) {
        var photo1 = document.querySelectorAll(".market_banner_photo_list");
        var p = document.querySelectorAll(".photo_list_pone")
        var lis = document.querySelectorAll(".li1");
        for (var z = 0; z < lis.length; z++) {
            lis[z].className = "li1";
        }
        e.target.className = "change li1";

        if (name != "all") {
            for (var i = 0; i < p.length; i++) {
                photo1[i].style.display = "flex";
                if (name != p[i].innerText) {
                    photo1[i].style.display = "none";
                }
            }
        } else {
            for (var i = 0; i < photo1.length; i++) {
                photo1[i].style.display = "flex";
            }
        }
    }
    // $(function () {
    //     var boxTop = $(".market_banner_nav").offset().top;
    //     $(window).scroll(function () {
    //         if ($(document).scrollTop() >= boxTop) {
    //             $(".market_banner_nav").offset().top = "100px";
    //         }
    //     })
    // })()


    async function loadNFTs() {

        const provider = new ethers.providers.JsonRpcProvider("https://http-testnet.hecochain.com")


        const marketContract = new ethers.Contract(nftMarketAddress, Market, provider)

        const pro = await marketContract.getRecommend(1)
        console.log(pro)
        let arr = new Array()
        for (let i = 0; i < pro.length; i++) {
            arr.push([pro[i].contractAddress.toString(), pro[i].tokenId.toString()])
        }
        let product = new Array()
        for (let i = 0; i < arr.length; i++) {
            const info = await marketContract.getGoodsByContractAddress(arr[i][0])
            const id = arr[i][1]
            for (let i = 0; i < info.length; i++) {
                if (info[i].tokenId.toString() === id) {
                    product.push(info[i])
                }
            }
        }


        const proInfo = await Promise.all(product.map(async i => {
            let price = ethers.utils.formatUnits(i.price.toString(), "ether")
            const imageUrl = i.headImg.toString()
            //const meta = await axios.get(imageUrl)
            let item = {
                contractAddress: i.contractAddress,
                price,
                tokenId: i.tokenId.toNumber(),
                image: imageUrl,
                name: i.name,
                description: i.info,
                type: i.nftType.toNumber(),
            }
            return item;
        }))
        // console.log(proInfo)

        setNfts(proInfo)
        // setLoadingState('loaded') 
    }

    async function BuyNft(nft) {
        
        if (!metaMask) {
            alert("no metaMask");
            console.log("No metamask");
        } else {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)

            const signer = provider.getSigner()
            const accountAddress = signer.getAddress()
            const contract = new ethers.Contract(nftMarketAddress, Market, signer)
            const xybContract = new ethers.Contract(tokenXYBaddress, xybToken, signer)

            const price = ethers.utils.parseUnits(nft.price.toString(), "ether")

            const approvement = await xybContract.approve(nftMarketAddress, price)
            await approvement.wait()

            const transactions = await contract.buyNft(nft.contractAddress, nft.tokenId).then(() => waitCircle[i].style.display = "none").then(() => mask[i].style.display = "none")
            console.log(transactions)
        };

    }

    async function Buy(nft, i) {
        const btn = document.querySelectorAll(".photo_list_photo_button");
        const waitCircle = document.querySelectorAll(".loadingSix")
        
        if (metaMask) {
            waitCircle[i].style.display = "block"
            const mask = document.querySelectorAll('.mask');
            mask[i].style.display = "block";
            btn[i].innerHTML = "?????????"
            const buyNft = BuyNft(nft)
            buyNft.then(value => {
                alert("????????????");
                loadNFTs()
            },
                reason => {
                    alert("????????????");
                    waitCircle[i].style.display = "none"
                    mask[i].style.display = "none"
                    btn[i].innerHTML = "??????"
            })
        }else
            alert("??????metaMask??????")
       
    }



    return (
        <div>

            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NFC????????????</title>
                <script async type="text/javascript" src="/static/lib/jquery.min.js" />
                <script async type="text/javascript" src="/static/lib/bootstrap.min.js" />
                <link rel="stylesheet" href="/css/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/base.css" />
                <link rel="stylesheet" href="/css/commoon.css" />
                <link rel="stylesheet" href="/css/market.css" />
                <script async type="text/javascript" src="/static/lib-flexible-2.0/index.js"></script>


            </Head>
            <main>
                <header className="shortcut ">
                    <div className="logo">
                        <h1>
                            <Link href="/">
                                <a>NFT????????????</a>
                            </Link>
                        </h1>
                    </div>
                    <nav className="shortcut_nav">
                        <ul>
                            <li>
                                <input type="search" placeholder="??????" name="search" autoFocus="autofocus" />
                            </li>
                            <li className="shortcut_nav_li1">
                                <Link href="/">
                                    <a>??????</a>
                                </Link>
                                <div className="shortcut_nav_div1">
                                    <a href="#">??????NFT</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                    <a href="#">????????????</a>
                                    <a href="#">?????????</a>
                                    <a href="#">?????????</a>
                                </div>
                            </li>
                            <li className="shortcut_nav_li2">
                                <Link href="/create"><a>??????</a></Link>
                                <div className="shortcut_nav_div2">
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                </div>
                            </li>
                            <li className="shortcut_nav_li3">
                                <Link href="/market"><a>??????</a></Link>

                            </li>

                            <li><Link href="/personalInfo"><a>??????</a></Link></li>

                        </ul>
                    </nav>
                     <div className="click">
                            123
                        </div>
                </header>
                <section className="market_banner ">

                    <div className="market_banner_section">
                        <div className="market_banner_nav">
                            <ul className="market_banner_nav_ul">
                                <li className="li1 change" onClick={(e) => li1(e, "all")}>????????????</li>
                                <li className="li1 " onClick={(e) => li1(e, "?????????")}>?????????</li>
                                <li className="li1 " onClick={(e) => li1(e, "??????")}>??????</li>
                            </ul>
                        </div>
                        <div className="market_banner_photo" >
                            {
                                nfts.map((nft, i) => (
                                    <div key={i} className="market_banner_photo_list"
                                        onMouseOver={() => chu_mo(i)} onMouseOut={() => li_kai(i)}>
                                        <div className="mask"></div>
                                        <div className="loadingSix">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>

                                        <div className="photo_list_img_container ">
                                            <img src={nft.image} className="photo_list_img" />
                                        </div>
                                        <div className="photo_list_photo_div ">
                                            <p style={{ height: '64px' }} className="photo_list_p">{nft.name}</p>
                                            <div style={{ height: '70px', overflow: 'hidden' }} className="photo_list_photo_div_div">
                                                <p className="photo_list_pone">{nft.type == 1 ? "?????????" : "??????"}</p>
                                            </div>
                                        </div>
                                        <div className="photo_list_photo_div1">
                                            <p className="photo_list_photo_p1">
                                                <img className="price-img" src="/price.svg" />
                                                <span className="price-text"> {nft.price} ETH</span>
                                            </p>
                                            <button className="photo_list_photo_button"
                                                onClick={() => Buy(nft, i)}>??????</button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </section>
            </main>
        </div >



    )
}