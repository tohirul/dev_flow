import Link from "next/link";
import styles from "./projects.module.css"

export default function page() {
    return (
        <main>
            <h1>Project List</h1>
            <ul className={styles.ul}>
                <li>
                    <Link href="/projects/jobit">JobIt</Link>
                </li>
                <li>
                    <Link href="/projects/carrent">
                        Car Rent
                    </Link>
                </li>
                <li>
                    <Link href="/projects/hipnode">Hip Node</Link>
                </li>
            </ul>
        </main>
    );
}