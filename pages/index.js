
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script'

function HomePage() {
    return (
        <div>
            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>NFC交易市场</title>
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
                                <div>
                                    <a href="#">帮助中心</a>
                                    <a href="#">平台状况</a>
                                    <a href="#">建议</a>
                                    <a href="#">社区</a>
                                    <a href="#">文档</a>
                                    <a href="#">东西</a>
                                </div>

                            </li>

                            <li><Link href="/personalInfo/"><a>个人</a></Link></li>

                        </ul>
                    </nav>
                </header>

                <section className="banner ">
                    <div className="banner-bg">
                    </div>
                    <div className="banner-text">
                        <h1>发现，收集，和<br />
                            提供超凡的NFT交易服务</h1>
                        <h2>
                            就在世界第一大的NFT市场
                        </h2>
                        <ul>
                            <li>
                                <a href="#">
                                    搜索
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    创作
                                </a>
                            </li>
                        </ul>
                        <a className="introduce" href="#">在该主页上你将获得的特色服务</a>
                    </div>
                    <div className="banner-img">
                        <div className="banner-works">
                            <a href="#">
                                <img src="/1.jpg" alt="" />

                                <div className="works_introduce">
                                    <div className="suibian"><img src="/named.jpg" alt="" /></div>
                                    <div className="suibian2">
                                        <h3 >NFTname </h3>
                                        <div >作者</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </section>
                <section class="tail">
                    <div class="tail_nav">
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                        <a href="#" class="tail_nav_a">评价一</a>
                    </div>
                </section>
                <section class="ending">
                    <div class="ending_left">
                        <div class="ending_left_div1">Stay in the loop</div>
                        <div class="ending_left_div2">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.</div>
                        <div class="ending_left_div3">
                            <input class="ending_left_div3_input"></input>
                            <button class="ending_left_div3_btn"></button>
                        </div>
                    </div>
                    <div class="ending_right"></div>
                </section>
            </main>


        </div >
    )
};
export default HomePage;