'use client';
import styles from "./header.module.css";
const Link = require('next/link');

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/">SPT Stuff.</Link>
            <nav>
                <ul>
                    <li><Link href="/stats">Stats</Link></li>
                </ul>
            </nav>
        </header>
    );
}