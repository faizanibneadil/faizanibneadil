'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ClientWidget } from "payload";

export function Visitors(props: ClientWidget) {
    console.log(props)
    return (
        <div className="bg-[var(--theme-elevation-50)] rounded-[var(--style-radius-m)] p-4 border border-solid border-[var(--theme-border-color)]" id={props.slug}>
            {/* <h3 className="card__title">Users</h3> */}
            <div>content</div>
            <div>content</div>
            {/* <div className="card__actions">
                <a type="button" aria-label="Create new Users" className="btn btn--icon btn--icon-style-with-border btn--icon-only btn--size-medium btn--icon-position-right btn--withoutPopup btn--style-icon-label btn--round btn--withoutPopup" title="Create new Users" href="/admin/collections/users/create">
                    <span className="btn__content">
                        <span className="btn__icon">
                            <svg className="icon icon--plus" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path className="stroke" d="M5.33333 9.99998H14.6667M9.99999 5.33331V14.6666" stroke-linecap="square"></path></svg>
                        </span>
                    </span>
                </a>
            </div> */}
            {/* <a type="button" aria-label="Show all Users" className="btn card__click btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-none btn--withoutPopup" title="Show all Users" href="/admin/collections/users">
                <span className="btn__content"></span>
            </a> */}
        </div>
    )
}