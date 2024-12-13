'use client';
import styles from "./footer.module.css";
const Link = require('next/link');

export default function Footer() {
    return (
        <footer>
            <div className={styles.footerContainer}>
                <div>
                    <Link href="https://github.com/sp-tarkov/build/releases">SPT</Link>
                    <Link href="https://github.com/zhliau/fika-spt-server-docker">Fika Docker</Link>
                </div>
            </div>
        </footer>
    );
}