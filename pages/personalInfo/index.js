import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Head from 'next/head'
import Link from "next/link"
import { create as ipfsHttpClient } from 'ipfs-http-client'


import $ from 'jquery'

import {
    nftMarketAddress, tokenXYBaddress, nftAddress
} from '../../config'

import Market from '../../abi/nftmarket.json'
import xybToken from '../../abi/xybToken.json'
import NFT from '../../abi/nft.json'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

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
    const [fileUrl, setFileUrl] = useState(null)
    const [nfts, setNfts] = useState([])
    const [nftsUpMall, setUpMall] = useState([])
    const [nftsDownMall, setDownMall] = useState([])

    const [userInfo, setUsers] = useState([])
    const [signer, setSigner] = useState(null)

    const [marketContract, setMarketContract] = useState()
    const [nftContract, setNftContract] = useState()

    const [recommeded, setRecommend] = useState([])

    const [userAddress, setAddress] = useState()
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
            loadStart()

            console.log(signer)
        }


    }, [])

    function chu_mo(box, num) {

        var btn1 = document.querySelectorAll(".photo_list_photo_button");
        btn1[box + num].style.display = "block";
        return false;

    }

    function li_kai(box, num) {
        var btn1 = document.querySelectorAll(".photo_list_photo_button");
        btn1[box + num].style.display = "none";
        return false;

    }

    function copy(e) {
        $(".imformation .adress").mouseover(function () {
            $(this).css("color", "black").children("div").stop().fadeIn("fast").addClass("current");
        })

        $(".imformation .adress").mouseout(function () {
            $(this).css("color", "#666").children("div").stop().fadeOut("fast");
        })
        $(".imformation .adress").click(function () {
            $(this).children("div")[0].innerHTML = '<div></div>?????????';

        })

        $(".imformation .share").mouseover(function () {
            $(this).children("div").stop().fadeIn("fast").addClass("current");
        })
        $(".imformation .share").mouseout(function () {
            $(this).children("div").stop().fadeOut("fast");
        })

    }
    function show(id) {


        $(id).addClass('border');
        var index = $(id).index();
        $(id).siblings().removeClass('border');
        $(".work .banner .market_banner_photo").eq(index).show().siblings(".market_banner_photo").hide();

        console.log("show");
    }

    async function loadStart() {
        //setLoadingState('loaded')
        const connected = await connect()

        await connected.wait

        loadNFTs(connected)

    }
    async function connect() {
        const web3Modal = new Web3Modal({
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        setSigner(signer)
        return signer
    }
    async function loadNFTs(signer) {

        const accountAddress = await signer.getAddress()


        const marketContract = new ethers.Contract(nftMarketAddress, Market, signer)
        const NftContract = new ethers.Contract(nftAddress, NFT, signer)
        const user = await marketContract.getUser(accountAddress)

        var ushering = {
            userName: user.username,
            headImg: user.headImg,
            motto: user.motto,
        }
        setUsers(ushering)
        //const pro = await marketContract.getRecommend(1)
        const nftContract = await marketContract.getMyContract(accountAddress)

        // get the goods info of each nftContract 
        var arr = new Array();
        for (let i = 0; i < nftContract.length; i++) {
            let info = await marketContract.getGoodsByContractAddress(nftContract[i])
            for (let i = 0; i < info.length; i++) {
                if (info[i].owner == accountAddress) {
                    arr.push(info[i])
                }
            }
            //console.log("info", info.length)
        }

        const buyNfts = await marketContract.getMyBuyOrder(accountAddress)
        console.log("buyNfts", buyNfts)
        for (let i = 0; i < buyNfts.length; i++) {
            let info = await marketContract.getGoodsByContractAddress(buyNfts[i].contractAddress)
            const tokenId = buyNfts[i].tokenId.toNumber()
            let owned = false
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].tokenId.toNumber() == tokenId)
                    owned = true
            }
            for (let j = 0; j < info.length; j++) {
                if (info[j].tokenId.toNumber() == tokenId && !owned && info[j].owner == accountAddress)
                    arr.push(info[j]);
            }
        }
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
                type: i.nftType.toNumber(),
                upMall: i.upMall,
                owner: i.owner
            }
            return item;
        }))

        const upMall = new Array()
        const downMall = new Array()
        for (let i = 0; i < proInfo.length; i++) {
            if (proInfo[i].upMall) {
                upMall.push(proInfo[i])
            } else
                downMall.push(proInfo[i])
        }
        judgeWhetherRecommended(marketContract, proInfo)

        setAddress(accountAddress)
        setMarketContract(marketContract)
        setNftContract(NftContract)
        setNfts(proInfo)
        setUpMall(upMall)
        setDownMall(downMall)
        setLoadingState('loaded')
    }

    async function setNftUpOrDownMall(nft) {
        // if (!nft.upMall) {
        //     const approveNft = await nftContract.approve(nftMarketAddress, nft.tokenId)
        //     await approveNft.wait()
        // }


        const upSheld = await marketContract.setUpMall(nftAddress, nft.tokenId)
        await upSheld.wait()

    }
    async function setNftRecommend(nft) {
        //const marketContract = new ethers.Contract(nftMarketAddress, Market, signer)
        const xybContract = new ethers.Contract(tokenXYBaddress, xybToken, signer)
        console.log("upMall", nft.upMall)
        const price = await marketContract.adverPrice()
        const adverPrice = ethers.utils.parseUnits(price.toString(), "ether")


        console.log("adverPrice", adverPrice)
        const approvement = await xybContract.approve(nftMarketAddress, adverPrice)
        await approvement.wait()


        const transaction = await marketContract.setRecommend(nft.contractAddress, nft.tokenId, nft.type)
        await transaction.wait()
    }

    async function setNftLostRecommend(nft) {
        const transaction = await marketContract.setLostRecommend(nft.contractAddress, nft.tokenId, nft.type)
        await transaction.wait()
    }

    async function setIfRecommend(e, nft, box, num) {
        const buttonRecommend = document.querySelectorAll('.photo_list_photo_button')
        const waitCircle = document.querySelectorAll(".loadingSix")
        const i = box + num
        waitCircle[i].style.display = "block"
        const mask = document.querySelectorAll('.mask');
        mask[i].style.display = "block";

        if (buttonRecommend[i].innerHTML == "??????") {
            buttonRecommend[i].innerHTML = "?????????"
            const temp = setNftRecommend(nft)

            temp.then(value => { alert("????????????"); loadNFTs(signer); waitCircle[i].style.display = "none"; buttonRecommend[i].innerHTML = "????????????"; mask[i].style.display = "none" },
                reason => { alert("????????????"); waitCircle[i].style.display = "none"; buttonRecommend[i].innerHTML = "??????"; mask[i].style.display = "none" })

            console.log(temp)
        } else {
            console.log(buttonRecommend[i].innerHTML)
            buttonRecommend[i].innerHTML = "?????????"
            const temp = setNftLostRecommend(nft)

            temp.then(value => { alert("????????????"); loadNFTs(signer); waitCircle[i].style.display = "none"; buttonRecommend[i].innerHTML = "??????"; mask[i].style.display = "none" },
                reason => { alert("????????????"); waitCircle[i].style.display = "none"; buttonRecommend[i].innerHTML = "????????????"; mask[i].style.display = "none" })


        }


    }
    async function judgeWhetherRecommended(marketContract, nfts) {

        const arr = new Array(nfts.length)
        for (let i = 0; i < nfts.length; i++) {
            const listed = false
            if (nfts[i].type == 1) {
                const recommendList = await marketContract.getRecommend(1)
                for (let j = 0; j < recommendList.length; j++) {
                    if (recommendList[j].contractAddress == nfts[i].contractAddress && nfts[i].tokenId == recommendList[j].tokenId) {
                        arr[i] = true
                        listed = true
                        break
                    }
                }
                if (!listed)
                    arr[i] = false
            } else {
                const recommendList = await marketContract.getRecommend(2)
                for (let j = 0; j < recommendList.length; j++) {
                    if (recommendList[j].contractAddress == nfts[i].contractAddress && nfts[i].tokenId == recommendList[j].tokenId) {
                        arr[i] = true
                    }
                }
                if (!listed)
                    arr[i] = false
            }
        }
        setRecommend(arr)
        // console.log(arr)
    }

    async function setIfUpMall(e, nft, box, num) {
        const buttonRecommend = document.querySelectorAll('.photo_list_photo_button')
        const waitCircle = document.querySelectorAll(".loadingSix")
        const i = box + num // find the location of the element
        waitCircle[i].style.display = "block"
        const mask = document.querySelectorAll('.mask');
        mask[i].style.display = "block";
        if (buttonRecommend[i].innerHTML == "??????") {
            buttonRecommend[i].innerHTML = "?????????"
            const upToMall = setNftUpOrDownMall(nft)
            upToMall.then(value => {
                alert("????????????"); loadNFTs(signer); buttonRecommend[i].innerHTML = "??????";
                waitCircle[i].style.display = "none"; mask[i].style.display = "none"
            },
                reason => {
                    alert("????????????"); buttonRecommend[i].innerHTML = "??????";
                    waitCircle[i].style.display = "none"; mask[i].style.display = "none"
                })
        } else {
            buttonRecommend[i].innerHTML = "?????????"
            const upToMall = setNftUpOrDownMall(nft)
            upToMall.then(value => {
                alert("????????????"); loadNFTs(signer); buttonRecommend[i].innerHTML = "??????";
                waitCircle[i].style.display = "none"; mask[i].style.display = "none"
            },
                reason => {
                    alert("????????????"); buttonRecommend[i].innerHTML = "??????";
                    waitCircle[i].style.display = "none"; mask[i].style.display = "none"
                })
        }
    }

    async function onChange(e) {
        console.log("gogo")
        const file = e.target.files[0]
        //setImage(file)
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )

            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }

    }

    function previewFile(e, imgId) {
        var preview = document.querySelector(imgId);
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            preview.style.display = 'block';

        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }


    if (!signer) {
        return (
            <div className="my-5 text-center ">
                <script async type="text/javascript" src="/static/lib/jquery.min.js" />


                <script async type="text/javascript" src="/static/lib/bootstrap.min.js" />

                {/* <link rel="stylesheet" href="../../static/css/bootstrap/css/bootstrap.min.css" /> */}

                <link rel="stylesheet" href="/css/bootstrap/css/bootstrap.min.css" />

                <link rel="stylesheet" href="/css/commoon.css" />
                <link rel="stylesheet" href="/css/information.css" />


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
                                <input type="search" placeholder="??????" name="search" autoFocus="autofocus"></input>
                            </li>
                            <li className="shortcut_nav_li1">
                                <Link href="/"><a>??????</a></Link>
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

                            <li><a href="#">??????</a></li>

                        </ul>
                    </nav>
                </header>
                <img src="/metaMaskLogo.png" className="pic" />
                <h1 className="drop">???????????????</h1>
            </div>)
    }
    else {
        return (

            <div>


                <Head>
                    <meta charset="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>NFC????????????</title>

                    <script async type="text/javascript" src="/static/lib/jquery.min.js" />

                    <script async type="text/javascript" src="/static/lib/bootstrap.min.js" />
                    <script async type="text/javascript" src="/static/lib-flexible-2.0/index.js" />
                    <script async type="text/javascript" src="/static/lib/jq.js" />

                    <link rel="stylesheet" href="/css/bootstrap/css/bootstrap.min.css" />

                    <link rel="stylesheet" href="/css/commoon.css" />
                    <link rel="stylesheet" href="/css/information.css" />
                    {/* <link rel="stylesheet" href="/css/index.css" /> */}
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
                                    <input type="search" placeholder="??????" name="search" autoFocus="autofocus"></input>
                                </li>
                                <li className="shortcut_nav_li1">
                                    <Link href="/"><a>??????</a></Link>
                                    <div className="shortcut_nav_div1">
                                        <Link href="/market"><a>??????NFT</a></Link>
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

                                <li><a href="#">
                                    <span className="glyphicon glyphicon-user"></span>

                                </a></li>

                            </ul>
                        </nav>
                    </header>
                    <div style={linkStyle.div}>
                        <section className="bg">
                            <input onChange={e => previewFile(e, ".bg-img")} type="file" accept="/image"></input>
                            <img src="" className="bg-img"></img>

                            <div className="bgc"></div>
                        </section>

                        <section className="imformation">
                            <div className="img">
                                <input onChange={e => previewFile(e, '.headImg')} type="file" >
                                </input>
                                <img src="/" className="headImg"></img>
                                {console.log(fileUrl)}

                            </div>
                            <div className="button">
                                <div className="btn-group share" onMouseOver={(e) => copy(e)}>
                                    <div className="shares">
                                        <div></div>??????
                                    </div>
                                    <button type="button" className="btn btn-default dropdown-toggle  glyphicon glyphicon-share button1"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </button>
                                    <ul className="dropdown-menu menu">
                                        <li><a href="#" className="link">????????????</a></li>
                                        <li><a href="#" className="wechat">?????????????????????</a></li>
                                        <li><a href="#" className="qq">?????????qq??????</a></li>

                                    </ul>
                                </div>

                                <div className="btn-group" style={linkStyle.div1}>
                                    <button type="button"
                                        className="btn btn-default dropdown-toggle glyphicon glyphicon-option-vertical   button2"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </button>
                                    <ul className="dropdown-menu menu">
                                        <li><a href="#">??????</a></li>


                                    </ul>
                                </div>


                            </div>

                            <h2 style={linkStyle.h2}>{userInfo.userName ? userInfo.userName : "?????????"}</h2>
                            {console.log(userInfo)}
                            <a className="adress" href="javascript:;" onMouseOver={(e) => copy(e)}>
                                <div className="copy">
                                    <div></div>??????

                                </div>
                                {userAddress}
                            </a>
                            <p>???2021???9?????????</p>
                        </section>
                        <section className="work">???
                            <header>
                                <ul>
                                    <li id="id1" className="border" onClick={() => show("#id1")}><strong>??????</strong> 1</li>
                                    <li id="id2" onClick={() => show("#id2")}><strong>????????? ?????????</strong> 0</li>
                                    <li id="id3" onClick={() => show("#id3")}><strong>??????</strong> 0</li>
                                    <li><strong>??????</strong> 0</li>
                                    <li><strong>??????</strong></li>
                                    <li><strong>??????</strong></li>
                                    <li><strong>????????????</strong></li>
                                </ul>
                            </header>
                            <div className="body">
                                <div className="tool">
                                    <div className="input-group input-group-lg " style={linkStyle.div3}>
                                        <input type="text" className="form-control text" placeholder="Search for..."></input>
                                        <span className="input-group-btn" style={linkStyle.span}>
                                            <button className="btn btn-default  bun2" type="button">??????</button>
                                        </span>
                                    </div>
                                    <div className="btn-group" style={linkStyle.div4}>
                                        <button type="button" className="btn btn-default dropdown-toggle btn-lg bun1 "
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={linkStyle.button}>
                                            ????????????<span className="caret" style={linkStyle.span2}></span>
                                        </button>
                                        <ul className="dropdown-menu menu2 ">
                                            <li><a href="#">????????????</a></li>
                                            <li><a href="#">???????????????</a></li>
                                            <li><a href="#">???????????????</a></li>

                                        </ul>
                                    </div>

                                    <div className="btn-group" style={linkStyle.div2}>
                                        <button type="button" className="btn btn-default dropdown-toggle btn-lg  bun1 "
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={linkStyle.button1}>
                                            ????????????<span className="caret" style={linkStyle.span1}></span>
                                        </button>
                                        <ul className="dropdown-menu menu2 ">
                                            <li><a href="#"> ????????????</a></li>
                                            <li><a href="#">??????</a></li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="banner">
                                    <div className="market_banner_photo">

                                        {
                                            nfts.map((nft, i) => (
                                                <div key={i} className="market_banner_photo_list"
                                                    onMouseOver={() => chu_mo(0, i)} onMouseOut={() => li_kai(0, i)}>
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
                                                            <p className="photo_list_pone">{nft.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo_list_photo_div1">
                                                        <p className="photo_list_photo_p1">
                                                            <img className="price-img" src="/price.svg" />
                                                            <span className="price-text"> {nft.price} ETH</span>
                                                        </p>

                                                        <button className="photo_list_photo_button" onClick={(e) => {
                                                            setIfUpMall(e, nft, 0, i); console.log("owner", nft.owner)
                                                        }}>{nft.upMall ? "??????" : "??????"}</button>
                                                    </div>
                                                </div>
                                            ))
                                        }


                                    </div>
                                    <div className="market_banner_photo">
                                        {
                                            nftsUpMall.map((nft, i) => (

                                                <div key={i} className="market_banner_photo_list"

                                                    onMouseOver={() => chu_mo(nfts.length, i)} onMouseOut={() => li_kai(nfts.length, i)}>
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
                                                            <p className="photo_list_pone">{nft.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo_list_photo_div1">
                                                        <p className="photo_list_photo_p1">
                                                            <img className="price-img" src="/price.svg" />
                                                            <span className="price-text"> {nft.price} ETH</span>
                                                        </p>

                                                        <button className="photo_list_photo_button" onClick={(e) => setIfRecommend(e, nft, nfts.length, i)}>{recommeded[i] ? "????????????" : "??????"}</button>
                                                    </div>
                                                </div>
                                            ))
                                        }



                                    </div>
                                    <div className="market_banner_photo">
                                       


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