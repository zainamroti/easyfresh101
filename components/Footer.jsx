import React from 'react'
import styles from '../styles/Home.module.css'


function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://syedzainjeelani.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Created with Next.js & ❤️ by&nbsp;{<strong> {"Zain"} </strong>}
            </a>
        </footer>
    )
}

export default Footer
