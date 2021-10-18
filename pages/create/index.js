import Head from 'next/head'
import Link from 'next/link'

import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal"
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftAddress, nftMarketAddress
} from '../../config'

import NFT from "../../abi/nft.json"
import Market from "../../abi/nftmarket.json"

const linkStyle = {
    input: {
        border: '1px solid #ccc',
        paddingleft: 5
    },
    detail: {
        resize: 'none',
        outline: 'none'
    }

};

function CreatePage() {
    const [fileUrl, setFileUrl] = useState(null)
    const [image, setImage] = useState(null)
    const [formInput, updateFormInput] = useState({ name: '', price: '', description: '' })

    useEffect(() => {
        selectChain()
    }, [])
    async function onChange(e) {
        previewFile(e)
        console.log("gogo")
        const file = e.target.files[0]
        setImage(file)
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

    function previewFile(e) {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
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

    function selectChain() {
        var item = document.querySelector('.BlockChain');
        var flag = 0;
        var items = item.querySelectorAll('div');


        item.onclick = function () {
            if (flag == 0) {

                this.style.overflow = 'visible';
                flag = 1;
            }
            else {

                this.style.overflow = 'hidden';
                flag = 0;
            }

        }
        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute('index', i);
            items[i].onclick = function () {
                var index = this.getAttribute('index');
                var divs = items[index].innerHTML;
                for (var j = index; j > 0; j--) {
                    items[j].innerHTML = items[j - 1].innerHTML;
                }
                items[0].innerHTML = divs;


            }

        }
    }
    async function createProduct() {
        const { name, price, description } = formInput
        if (!name || !price || !description) {
            alert("info not complete")
            return;
        }

        Create(fileUrl)

    }
    async function Create(url) {
        console.log("FUck")
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        // create the nft token
        let contract = new ethers.Contract(nftAddress, NFT, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        const product = {
            contractAddress: nftAddress,
            tokenId: tokenId,
            name: "Metaverse",
            symbol: "METT",
            uri: url,
            headImg: url,
            price: price,
            info: formInput.description,
            nftType: 1,
            password: ''
        }
        // create product on the market
        contract = new ethers.Contract(nftMarketAddress, Market, signer)

        transaction = await contract.addProduct(product)
        await transaction.wait()
    }

    return (
        <html lang="en">

            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>创造页</title>
                <script async type="text/javascript" src="/static/lib/jquery.min.js" />
                <script async type="text/javascript" src="/static/css/bootstrap/js/bootstrap.min.js" />
                <link rel="stylesheet" href="/css/bootstrap/css/bootstrap.min.css" />
                {/* <link rel="stylesheet" href="../../static/css/base.css" /> */}
                <link rel="stylesheet" href="/css/commoon.css" />
                <link rel="stylesheet" href="/css/create.css" />

                <script async type="text/javascript" src="/static/lib-flexible-2.0/index.js" />

            </Head>

            <body>

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
                            <li><Link href="/"><a>首页</a></Link></li>
                            <li><Link href="/create"><a>创作</a></Link></li>
                            <li><Link href="/market"><a>市场</a></Link></li>
                            <li><Link href="/personalInfo"><a>个人</a></Link></li>

                        </ul>
                    </nav>
                    <div class="click">
                        123
                    </div>
                </header>

                <article>

                    <h3>创作新的作品</h3>
                    <section className="new_item">
                        <h4>图片，视频，音频，或 3D 模型</h4>
                        <p className="item-type"> 文件支持以下格式: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                            size: 40 MB</p>
                        <div className="item_uplode">
                            <div className="tips">
                                <img src="" alt="" className="imgs " />
                                <p>请上传文件</p>
                            </div>
                            <input className="item-flie" type="file" id="exampleInputFile" required="required" name="opus" onChange={onChange} />

                        </div>
                    </section>
                    <form action="/uploading" method="POST" id="upload">
                        <section className="name">

                            <header>
                                <h4>名字* </h4>
                            </header>
                            <input className="input0" type="text" required="required" placeholder="作品名称"
                                style={linkStyle.input} name="NTFname" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
                        </section>
                        <section className="link">
                            <header>
                                <h4>价格*</h4>
                                <p>
                                </p>
                            </header>

                            <input className="input1" type="url" required="required"
                                style={linkStyle.input} name="url" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />


                        </section>
                        <section className="detail">
                            <header>
                                <h4>描述</h4>
                                <p>描述将包含在项目的详细信息页面上，位于其图像下方，支持 Markdown 语法。</p>
                            </header>
                            <textarea
                                placeholder="Asset Description"
                                className="mt-2 border rounded p-4"
                                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                            />
                        </section>
                        <section className="choose">
                            <header>
                                <h4>区块链</h4>
                            </header>
                            <div className="BlockChain">
                                <div className="Ethereum">
                                    <img src="/ethereum.png" alt="" />
                                    &nbsp; &nbsp;
                                    Ethereum
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </div>
                                <div className="polygon">
                                    <img src="/polygon.svg" alt="" />
                                    &nbsp; &nbsp;
                                    polygon
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </div>
                            </div>
                        </section>
                        <button type="submit" className="btn btn-primary" onClick={createProduct}>创作</button>
                    </form>
                </article>

            </body>

        </html>
    )
};

export default CreatePage;