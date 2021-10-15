
import Head from "next/head"
import Link from "next/link"

import Web3Modal from "web3modal"
import { useState, useEffect } from "react"
import { ethers } from "ethers"


import Script from "next/script"
import {
    nftMarketAddress, tokenXYBaddress
} from '../../config'

import Market from '../../abi/nftmarket.json'
import xybToken from "../../abi/xybToken.json"

export default function NftMarket() {
    const [nfts, setNfts] = useState([])
    useEffect(() => {
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
        var p = document.querySelectorAll(".photo_list_p")
        var lis = document.querySelectorAll(".li1");
        for (var z = 0; z < lis.length; z++) {
            lis[z].className= "li1";
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

    async function loadNFTs() {

        const provider = new ethers.providers.JsonRpcProvider("https://http-testnet.hecochain.com")
        //const signer = provider.getSigner()
        console.log(1)
        const marketContract = new ethers.Contract(nftMarketAddress, Market, provider)
        //const user = await marketContract.getUser(signer.getAddress())
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
            }
            return item;
        }))
        // console.log(proInfo)

        setNfts(proInfo)
        // setLoadingState('loaded') 
    }

    async function BuyNft(nft) {
        let isMetaMaskInstalled = () => {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };


        if (!isMetaMaskInstalled()) {
            alert("no metaMask");
            console.log("No metamask");
        } else {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)

            const signer = provider.getSigner()
            const contract = new ethers.Contract(nftMarketAddress, Market, signer)
            const xybContract = new ethers.Contract(tokenXYBaddress, xybToken, signer)

            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

            const approvement = await xybContract.approve(nftMarketAddress, price)
            await approvement.wait()

            const transactions = await contract.buyNft(nft.contractAddress, nft.tokenId)
            await transactions.wait()
        };

    }





    return (
        <div>
            
            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NFC交易市场</title>
                <script async type="text/javascript" src="/static/lib/jquery.min.js"/>
                <script async type="text/javascript" src="/static/lib/bootstrap.min.js"/>
                <link rel="stylesheet" href="/css/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/base.css" />
                <link rel="stylesheet" href="/css/commoon.css" />
                <link rel="stylesheet" href="/css/information.css" />
                <link rel="stylesheet" href="/css/index.css" />
                <script async type="text/javascript" src="/static/lib-flexible-2.0/index.js"></script>
                
                
            </Head>
            <main>
                <header className="shortcut ">
                    <div className="logo">
                        <h1>
                            <Link href="/">
                                <a>NFT交易市场</a>
                            </Link>
                        </h1>
                    </div>
                    <nav className="shortcut_nav">
                        <ul>
                            <li>
                                <input type="search" placeholder="查找" name="search" autoFocus="autofocus" />
                            </li>
                            <li className="shortcut_nav_li1">
                                <Link href="/create">
                                    <a>创作</a>
                                </Link>
                                <div className="shortcut_nav_div1">
                                    <a href="#">所有NFT</a>
                                    <a href="#">新的</a>
                                    <a href="#">艺术</a>
                                    <a href="#">音乐</a>
                                    <a href="#">域名</a>
                                    <a href="#">虚拟世界</a>
                                    <a href="#">交易卡</a>
                                    <a href="#">收藏品</a>
                                </div>
                            </li>
                            <li className="shortcut_nav_li2">
                                <Link href="/create"><a>上传</a></Link>
                                <div className="shortcut_nav_div2">
                                    <a href="#">排名</a>
                                    <a href="#">活动</a>
                                </div>
                            </li>
                            <li className="shortcut_nav_li3">
                                <Link href="/market"><a>市场</a></Link>

                            </li>

                            <li><Link href="/personalInfo"><a>个人</a></Link></li>

                        </ul>
                    </nav>
                </header>
                <section className="market_banner ">
                    <div className="market_banner_search">
                        <div className="input_div">
                            <input type="text" className="market_control" placeholder="搜索NFT商品">
                            </input>
                        </div>

                    </div>
                    <div className="market_banner_section">
                        <div className="market_banner_nav">
                            <ul className="market_banner_nav_ul">
                                <li className="li1 change" onClick={(e) => li1(e, "all")}>全部图片</li>
                                <li className="li1 " onClick={(e) => li1(e, "Faker")}>艺术品</li>
                                <li className="li1 " onClick={(e) => li1(e, "game")}>游戏品</li>
                            </ul>
                        </div>
                        <div className="market_banner_photo" >
                            {
                                nfts.map((nft, i) => (
                                    <div key={i} className="market_banner_photo_list"
                                        onMouseOver={() => chu_mo(i)} onMouseOut={() => li_kai(i)}>
                                        <img src={nft.image} className="photo_list_img" />
                                        <div className="photo_list_photo_div ">
                                            <p style={{ height: '64px' }} className="photo_list_p">{nft.name}</p>
                                            <div style={{ height: '70px', overflow: 'hidden' }} className="photo_list_photo_div_div">
                                                <p className="photo_list_pone">{nft.description}</p>
                                            </div>
                                        </div>
                                        <div className="photo_list_photo_div1">
                                            <p className="photo_list_photo_p1">{nft.price} ETH</p>
                                            <button className="photo_list_photo_button"
                                            onClick={() => BuyNft(nft)}>Buy now</button>
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