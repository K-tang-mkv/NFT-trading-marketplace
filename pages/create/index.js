import Head from 'next/head'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useState } from 'react'
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

    async function onChange(e) {
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
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>创造页</title>
                <link rel="stylesheet" href="../static/css/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="../static/css/base.css" />
                <link rel="stylesheet" href="../static/css/commoon.css" />
                <link rel="stylesheet" href="../static/css/create.css" />

                <script src="../../static/lib-flexible-2.0/index.js" />
                <script src="../../static/lib/jquery.min.js" />
            </Head>

            <body>

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
                                <input type="search" placeholder="查找" name="search" autofocus="autofocus" />
                            </li>
                            <li><a href="/">首页</a></li>
                            <li><a href="/create">创作</a></li>
                            <li><a href="/market">市场</a></li>
                            <li><a href="/personalInfo">个人</a></li>

                        </ul>
                    </nav>
                </header>

                <article>
                    <h3>创作新的作品</h3>
                    <section class="new_item">
                        <h4>图片，视频，音频，或 3D 模型</h4>
                        <p class="item-type"> 文件支持以下格式: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                            size: 40 MB</p>
                        <div class="item_uplode">
                            <div class="tips">
                                <img src={image} alt="" />
                                <p>请上传文件</p>
                            </div>
                            <input class="item-flie" type="file" id="exampleInputFile" required="required" name="opus" onChange={onChange} />
                        </div>
                    </section>
                    <form action="/uploading" method="POST" id="upload">
                        <section class="name">

                            <header>
                                <h4>名字* </h4>
                            </header>
                            <input class="input0" type="text" required="required" placeholder="作品名称"
                                style={linkStyle.input} name="NTFname" onChange={e => updateFormInput({ ...formInput, name: e.target.value })} />
                        </section>
                        <section class="link">
                            <header>
                                <h4>price</h4>
                                <p>
                                    OpenSea 将在此项目的详细信息页面上包含指向此 URL 的链接，以便用户可以点击，以了解更多信息，欢迎您链接到您自己的网页，了解更多详情。
                                </p>
                            </header>

                            <input class="input1" type="url" required="required" placeholder="https://yoursite.io/item/123"
                                style={linkStyle.input} name="url" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} />


                        </section>
                        <section class="detail">
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
                        <section class="choose">
                            <header>
                                <h4>区块链</h4>
                            </header>
                            <div class="BlockChain">
                                <div class="Ethereum">
                                    <img src="/ethereum.png" alt="" />
                                    &nbsp; &nbsp;
                                    Ethereum
                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                </div>
                                <div class="polygon">
                                    <img src="/polygon.svg" alt="" />
                                    &nbsp; &nbsp;
                                    polygon
                                    <span class="glyphicon glyphicon-chevron-down"></span>
                                </div>
                            </div>
                        </section>
                        <button type="submit" class="btn btn-primary" onClick={createProduct}>创作</button>
                    </form>
                </article>
            </body>

        </html>
    )
};

export default CreatePage;