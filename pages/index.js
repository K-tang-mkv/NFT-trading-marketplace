
import Head from 'next/head';
import Link from 'next/link';

import { useState, useEffect } from "react"
import { ethers } from "ethers"

import {
    nftMarketAddress
} from '../config'

import Market from '../abi/nftmarket.json'
export default function HomePage() {
    const [nfts, setNfts] = useState([])
    const [random, setRandom] = useState()
    useEffect(() => {
        loadNFTs()
    }, [])

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
            }
            return item;
        }))
        // console.log(proInfo)
        getRandomInt(proInfo.length)
        setNfts(proInfo)
        // setLoadingState('loaded') 
    }

    function getRandomInt(max) {
        const random = Math.floor(Math.random() * max);
        setRandom(random)
    }
    return (
        <div>
            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NFC????????????</title>
                <script async type="text/javascript" src="/static/lib/jquery.min.js" strategy="beforeInteractive" />

                <script async type="text/javascript" src="/static/lib-flexible-2.0/index.js" strategy="beforeInteractive" />
                <script async type="text/javascript" src="/static/lib/document.js" strategy="beforeInteractive" />
                {/* <link rel="stylesheet" href="../static/css/base.css" /> */}

                <link rel="stylesheet" href="/css/commoon.css" />
                <link rel="stylesheet" href="/css/index.css" />


            </Head>
            <main>
                <header className="shortcut ">
                    <div className="logo">
                        <h1 className="up">
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
                                <div>
                                    <a href="#">????????????</a>
                                    <a href="#">????????????</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                    <a href="#">??????</a>
                                </div>

                            </li>

                            <li><Link href="/personalInfo/"><a>??????</a></Link></li>

                        </ul>

                    </nav>
                    <div className="click">
                        123
                    </div>

                </header>

                <section className="banner ">
                    <div className="banner-bg">
                    </div>
                    <div className="banner-text">
                        <h1>?????????????????????<br />
                            ???????????????NFT????????????</h1>
                        <h2>
                            ????????????????????????NFT??????
                        </h2>
                        <ul>
                            <li>
                                <Link href="/market">
                                    <a>??????</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/create">
                                    <a>??????</a>
                                </Link>
                            </li>
                        </ul>
                        <a className="introduce" href="#">??????????????????????????????????????????</a>
                    </div>
                    <div className="banner-img">
                        <div className="banner-works">
                            <a href="#">
                                <img src={nfts.length ? nfts[random].image : '/1.jpg'} alt="" />

                                <div className="works_introduce">
                                    <div className="suibian"><img src="/named.jpg" alt="" /></div>
                                    <div className="suibian2">
                                        <h3 >{nfts.lenfth ? nfts[random].name : "NFT"}</h3>
                                        <div >name</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </section>

            </main>


        </div >
    )

}

