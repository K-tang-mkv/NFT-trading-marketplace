import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Head from 'next/head'
import Link from "next/link"
import Image from 'next/dist/client/image'
import $ from 'jquery'

import {
    nftMarketAddress
} from '../../config'

import Market from '../../abi/nftmarket.json'


const linkStyle = {
    div: {
        position: "relative",
        top: ".6rem"
    },
    div1: {
        marginRight: ".083333rem",
        marginLeft: "-0.041667rem"
    },
    h2: {
        marginTop: ".3rem"
    },
    span: {
        verticalAlign: "top"
    },
    span1: {
        marginLeft: "1rem"
    },
    span2: {
        marginLeft: ".833333rem"
    },
    div2: {
        width: "20%"
    },
    div3: {
        width: "40%"
    },
    div4: {
        width: "20%"
    },
    div6: {
        height: '70px', overflow: 'hidden'
    },
    button: {
        width: "100% "
    },
    button1: {
        width: "100%"
    }
}

export default function MyAssets() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        let isMetaMaskInstalled = () => {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };

        if (!isMetaMaskInstalled()) {
            alert("no metaMask");
            console.log("No metamask");
            setLoadingState('loaded')
        } else {
            show()
        }
        //loadNFTs()

    }, [])
    function copy(e) {
        $(".imformation .adress").mouseover(function () {
            $(this).css("color", "black").children("div").stop().fadeIn("fast").addClass("current");
        })

        $(".imformation .adress").mouseout(function () {
            $(this).css("color", "#666").children("div").stop().fadeOut("fast");
        })
        $(".imformation .adress").click(function () {
            $(this).children("div")[0].innerHTML = '<div></div>已复制';
        })

        $(".imformation .share").mouseover(function () {
            $(this).children("div").stop().fadeIn("fast").addClass("current");
        })
        $(".imformation .share").mouseout(function () {
            $(this).children("div").stop().fadeOut("fast");
        })

    }
    async function show(e) {

        $(".work header ul li").click(function () {
            $(this).addClass('border');
            var index = $(this).index();
            $(this).siblings().removeClass('border');
            $(".work .banner .market_banner_photo").eq(index).show().siblings(".market_banner_photo").hide();
        })
        loadNFTs()
    }
    async function loadNFTs() {

        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        console.log(1)
        const marketContract = new ethers.Contract(nftMarketAddress, Market, signer)
        const user = await marketContract.getUser(signer.getAddress())

        const pro = await marketContract.getRecommend(1)
        const nftContract = await marketContract.getMyContract(signer.getAddress())
        console.log(nftContract)
        // get the goods info of each nftContract 
        var arr = new Array();
        for (let i = 0; i < nftContract.length; i++) {
            const info = await marketContract.getGoodsByContractAddress(nftContract[i])
            for (let i = 0; i < info.length; i++) {
                arr.push(info[i]);
            }
        }
        console.log(arr)
        const proInfo = await Promise.all(arr.map(async i => {
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
        console.log(proInfo)

        setNfts(proInfo)
        setLoadingState('loaded')
    }


    if (loadingState === 'loaded' && !nfts.length) {
        return (
            <div className="my-5 text-center ">
                {/* <link rel="stylesheet" href="../../static/css/bootstrap/css/bootstrap.min.css" /> */}
                <link rel="stylesheet" href="../../static/css/base.css" />
                <link rel="stylesheet" href="../../static/css/commoon.css" />
                <link rel="stylesheet" href="../../static/css/index.css" />
                <link rel="stylesheet" href="../../static/css/information.css" />
                
                <header class="shortcut ">
                    <div class="logo">
                        <h1>
                            <a href="/">
                                NFT交易市场
                            </a>
                        </h1>
                    </div>
                    <nav class="shortcut_nav">
                        <ul>
                            <li>
                                <input type="search" placeholder="查找" name="search" autofocus="autofocus"></input>
                            </li>
                            <li class="shortcut_nav_li1">
                                <a href="/create">创作</a>
                                <div class="shortcut_nav_div1">
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
                            <li class="shortcut_nav_li2">
                                <a href="/create">上传</a>
                                <div class="shortcut_nav_div2">
                                    <a href="#">排名</a>
                                    <a href="#">活动</a>
                                </div>
                            </li>
                            <li class="shortcut_nav_li3">
                                <a href="/market">市场</a>
                                <div>
                                    <a href="#">帮助中心</a>
                                    <a href="#">平台状况</a>
                                    <a href="#">建议</a>
                                    <a href="#">社区</a>
                                    <a href="#">文档</a>
                                    <a href="#">东西</a>
                                </div>

                            </li>

                            <li><a href="#">个人</a></li>

                        </ul>
                    </nav>
                </header>
                <img src="/metaMaskLogo.png" className="pic" />
                <h1 class="drop">Please Install Metamask</h1>
            </div>)
    }
    else {
        return (
            <div>

                <Head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>NFC交易市场</title>
                    <script>
                        $(".work .banner .market_banner_photo").eq(0).show().siblings(".market_banner_photo").hide()


                    </script>
                    <link rel="stylesheet" href="../../static/css/bootstrap/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="../../static/css/base.css" />
                    <link rel="stylesheet" href="../../static/css/commoon.css" />
                    <link rel="stylesheet" href="../../static/css/information.css" />
                    <link rel="stylesheet" href="../../static/css/index.css" />
                </Head>

                <script src="../../static/lib-flexible-2.0/index.js" />

                <script src="../../static/lib/jquery.min.js" />

                <main>
                    <header class="shortcut ">
                        <div class="logo">
                            <h1>
                                <a href="/">
                                    NFT交易市场
                                </a>
                            </h1>
                        </div>
                        <nav class="shortcut_nav">
                            <ul>
                                <li>
                                    <input type="search" placeholder="查找" name="search" autofocus="autofocus"></input>
                                </li>
                                <li class="shortcut_nav_li1">
                                    <a href="/create">创作</a>
                                    <div class="shortcut_nav_div1">
                                        <a href="/market">所有NFT</a>
                                        <a href="#">新的</a>
                                        <a href="/market">艺术</a>
                                        <a href="#">音乐</a>
                                        <a href="#">域名</a>
                                        <a href="#">虚拟世界</a>
                                        <a href="#">交易卡</a>
                                        <a href="#">收藏品</a>
                                    </div>
                                </li>
                                <li class="shortcut_nav_li2">
                                    <a href="/create">上传</a>
                                    <div class="shortcut_nav_div2">
                                        <a href="#">排名</a>
                                        <a href="#">活动</a>
                                    </div>
                                </li>
                                <li class="shortcut_nav_li3">
                                    <a href="market">市场</a>
                                    <div>
                                        <a href="#">帮助中心</a>
                                        <a href="#">平台状况</a>
                                        <a href="#">建议</a>
                                        <a href="#">社区</a>
                                        <a href="#">文档</a>
                                        <a href="#">东西</a>
                                    </div>

                                </li>

                                <li><a href="#">个人</a></li>

                            </ul>
                        </nav>
                    </header>
                    <div style={linkStyle.div}>
                        <section class="bg">
                            <input type="file"></input>
                            <div class="bgc"></div>
                        </section>

                        <section class="imformation">
                            <div class="img">
                                <input type="file"></input>
                            </div>
                            <div class="button">
                                <div class="btn-group share">
                                    <div class="shares">
                                        <div></div>分享
                                    </div>
                                    <button type="button" class="btn btn-default dropdown-toggle  glyphicon glyphicon-share button1"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu menu">
                                        <li><a href="#" class="link">复制链接</a></li>
                                        <li><a href="#" class="wechat">分享给微信好友</a></li>
                                        <li><a href="#" class="qq">分享给qq好友</a></li>

                                    </ul>
                                </div>

                                <div class="btn-group" style={linkStyle.div1}>
                                    <button type="button"
                                        class="btn btn-default dropdown-toggle glyphicon glyphicon-option-vertical   button2"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </button>
                                    <ul class="dropdown-menu menu">
                                        <li><a href="#">设置</a></li>


                                    </ul>
                                </div>


                            </div>

                            <h2 style={linkStyle.h2}>未命名</h2>

                            <a class="adress" href="javascript:;" onMouseOver={(e) => copy(e)}>
                                <div class="copy">
                                    <div></div>复制

                                </div>
                                0x8316...9786
                            </a>
                            <p>自2021年9月注册</p>
                        </section>
                        <section class="work">、
                            <header>
                                <ul>
                                    <li class="border" onClick={(e) => show(e)}><strong>收集</strong> 1</li>
                                    <li><strong>创作</strong> 0</li>
                                    <li><strong>喜欢</strong> 0</li>
                                    <li><strong>隐藏</strong> 0</li>
                                    <li><strong>活动</strong></li>
                                    <li><strong>提供</strong></li>
                                    <li><strong>参考文献</strong></li>
                                </ul>
                            </header>
                            <div class="body">
                                <div class="tool">
                                    <div class="input-group input-group-lg " style={linkStyle.div3}>
                                        <input type="text" class="form-control text" placeholder="Search for..."></input>
                                        <span class="input-group-btn" style={linkStyle.span}>
                                            <button class="btn btn-default  bun2" type="button">搜索</button>
                                        </span>
                                    </div>
                                    <div class="btn-group" style={linkStyle.div4}>
                                        <button type="button" class="btn btn-default dropdown-toggle btn-lg bun1 "
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={linkStyle.button}>
                                            最近访问<span class="caret" style={linkStyle.span2}></span>
                                        </button>
                                        <ul class="dropdown-menu menu2 ">
                                            <li><a href="#">最近访问</a></li>
                                            <li><a href="#">最近创建过</a></li>
                                            <li><a href="#">最近交易过</a></li>

                                        </ul>
                                    </div>

                                    <div class="btn-group" style={linkStyle.div2}>
                                        <button type="button" class="btn btn-default dropdown-toggle btn-lg  bun1 "
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={linkStyle.button1}>
                                            个人作品<span class="caret" style={linkStyle.span1}></span>
                                        </button>
                                        <ul class="dropdown-menu menu2 ">
                                            <li><a href="#"> 所有作品</a></li>
                                            <li><a href="#">分类</a></li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="banner">
                                    <div className="market_banner_photo">

                                        {
                                            nfts.map((nft, i) => (
                                                <div key={i} className="market_banner_photo_list" onMouseMove="chu_mo">
                                                    <img src={nft.image} class="photo_list_img" />
                                                    <div className="photo_list_photo_div ">
                                                        <p style={{ height: '64px' }} className="photo_list_p">{nft.name}</p>
                                                        <div style={{ height: '70px', overflow: 'hidden' }} className="photo_list_photo_div_div">
                                                            <p className="photo_list_pone">{nft.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo_list_photo_div1">
                                                        <p className="photo_list_photo_p1">{nft.price} ETH</p>
                                                        <button className="photo_list_photo_button" onClick={() => BuyNft(nft)}>Buy</button>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>
                                    <div className="market_banner_photo">
                                        {
                                            nfts.map((nft, i) => (
                                                <div key={i} className="market_banner_photo_list" onMouseMove="chu_mo">
                                                    <img src={nft.image} class="photo_list_img" />
                                                    <div className="photo_list_photo_div ">
                                                        <p style={{ height: '64px' }} className="photo_list_p">{nft.name}</p>
                                                        <div style={{ height: '70px', overflow: 'hidden' }} className="photo_list_photo_div_div">
                                                            <p className="photo_list_pone">{nft.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo_list_photo_div1">
                                                        <p className="photo_list_photo_p1">{nft.price} ETH</p>
                                                        <button className="photo_list_photo_button" onClick={() => BuyNft(nft)}>Buy</button>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>
                                    <div className="market_banner_photo">
                                        {
                                            nfts.map((nft, i) => (
                                                <div key={i} className="market_banner_photo_list" onMouseMove="chu_mo">
                                                    <img src={nft.image} class="photo_list_img" />
                                                    <div className="photo_list_photo_div ">
                                                        <p style={{ height: '64px' }} className="photo_list_p">{nft.name}</p>
                                                        <div style={{ height: '70px', overflow: 'hidden' }} className="photo_list_photo_div_div">
                                                            <p className="photo_list_pone">{nft.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo_list_photo_div1">
                                                        <p className="photo_list_photo_p1">{nft.price} ETH</p>
                                                        <button className="photo_list_photo_button" onClick={() => BuyNft(nft)}>Buy</button>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>
                </main>

            </div>

        )
    }
}