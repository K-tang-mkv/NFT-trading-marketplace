import Image from "next/image"
export default function metaMaskAlert() {
    return (
        <div className="my-5 text-center">
          <Image src="/metamask.png" layout='fill' class="mb-4" alt=""/>
          <h1>Please Install Metamask</h1>
        </div>
    );
}