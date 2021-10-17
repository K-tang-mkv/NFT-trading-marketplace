
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
            <main>


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
                                        <div  >作者</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </section>
            </main>
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
                <div class="ending_head">
                    <div class="ending_left">
                        <div class="ending_left_div1">Stay in the loop</div>
                        <div class="ending_left_div2">加入我们的邮件列表，随时了解我们最新的功能发布、NFT 发布以及导航 NFT交易市场 的提示和技巧。</div>
                        <div class="ending_left_div3">
                            <input class="ending_left_div3_input" placeholder="你的email地址"></input>
                            <button class="ending_left_div3_btn">登录</button>
                        </div>
                    </div>
                    <div class="ending_right">
                        <div class="ending_right_head">Join the community</div>
                        <div class="ending_right_body">
                            <a href="#">图1</a>
                            <a href="#">图2</a>
                            <a href="#">图3</a>
                            <a href="#">图4</a>
                            <a href="#">图5</a>
                            <a href="#">图6</a>
                        </div>
                    </div>
                </div>
                <div class="ending_body">
                    <div class="ending_body_head">
                        <div class="ending_body_head_img">
                            <img href="#" ></img>
                        </div>
                        <div class="ending_body_head_header">NFT交易市场</div>
                        <div class="ending_body_head_end">
                            全球第一个也是最大的加密收藏品和不可替代代币（NFT）的数字市场。我们在这里购买、出售和发掘独家数字资产。
                        </div>
                    </div>
                    <div class="ending_body_section">
                        <div class="ending_body_section_list">
                            <div class="ending_body_section_list_div">Marketplace</div>
                            <a class="ending_body_section_list_a">All NFTs</a>
                            <a class="ending_body_section_list_a">New</a>
                            <a class="ending_body_section_list_a">Art</a>
                            <a class="ending_body_section_list_a">Music</a>
                            <a class="ending_body_section_list_a">Domain Names</a>
                            <a class="ending_body_section_list_a">Virtual Worlds</a>
                            <a class="ending_body_section_list_a">Trading Cards</a>
                            <a class="ending_body_section_list_a">Collectibles</a>
                            <a class="ending_body_section_list_a">Sports</a>
                        </div>
                        <div class="ending_body_section_list">
                            <div class="ending_body_section_list_div">My Account</div>
                            <a class="ending_body_section_list_a">Profile</a>
                            <a class="ending_body_section_list_a">Favorites</a>
                            <a class="ending_body_section_list_a">My Collections</a>
                            <a class="ending_body_section_list_a">Settings</a>
                            <a class="ending_body_section_list_a">Stats</a>
                            <a class="ending_body_section_list_a">Rankings</a>
                            <a class="ending_body_section_list_a">Activity</a>
                        </div>
                        <div class="ending_body_section_list">
                            <div class="ending_body_section_list_div">Resources</div>
                            <a class="ending_body_section_list_a">Help Center</a>
                            <a class="ending_body_section_list_a">Platform Status</a>
                            <a class="ending_body_section_list_a">Partners</a>
                            <a class="ending_body_section_list_a">Gas-Free Marketplace</a>
                            <a class="ending_body_section_list_a">Suggestions</a>
                            <a class="ending_body_section_list_a">Discord Community</a>
                            <a class="ending_body_section_list_a">Blog</a>
                            <a class="ending_body_section_list_a">Docs</a>
                            <a class="ending_body_section_list_a">Newsletter</a>
                        </div>
                        <div class="ending_body_section_list">
                            <div class="ending_body_section_list_div">Company</div>
                            <a class="ending_body_section_list_a">About</a>
                            <a class="ending_body_section_list_a">Careers</a>

                        </div>

                    </div>
                </div>
            </section>
        </div >
    )
};
export default HomePage;