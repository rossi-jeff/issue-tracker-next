'use client'

import { UsageArray } from '@/types/array.types'
import { EmailType } from '@/types/email.type'
import { useState } from 'react'

export default function EmailList({
	emails,
	createEmail,
	updateEmail,
	deleteEmail,
}: {
	emails: EmailType[]
	createEmail: Function
	updateEmail: Function
	deleteEmail: Function
}) {
	const [emailNew, setEmailNew] = useState<EmailType>({
		Address: '',
		Usage: 'Personal',
		Public: false,
	})
	const [emailEdit, setEmailEdit] = useState<EmailType>({
		Address: '',
		Usage: 'Personal',
		Public: false,
	})

	const newFieldChanged = (ev: any) => {
		const { name, value, checked } = ev.target
		let update: EmailType = {}
		switch (name) {
			case 'Address':
			case 'Usage':
				update = {
					...emailNew,
					[name]: value,
				}
				break
			case 'Public':
				update = {
					...emailNew,
					[name]: checked,
				}
				break
		}
		console.log('newFieldChanged', JSON.stringify(update))
		setEmailNew(update)
	}

	const editFieldChanged = (ev: any) => {
		const { name, value, checked } = ev.target
		let update: EmailType = {}
		switch (name) {
			case 'Address':
			case 'Usage':
				update = {
					...emailEdit,
					[name]: value,
				}
				break
			case 'Public':
				update = {
					...emailEdit,
					[name]: checked,
				}
				break
		}
		console.log('editFieldChanged', JSON.stringify(update))
		setEmailEdit(update)
	}

	const editEmail = (uuid: string) => {
		const email = emails.find((e) => e.UUID == uuid) || {
			Address: '',
			Usage: 'Personal',
			Public: false,
		}
		setEmailEdit(email)
		showEdit()
	}

	const createClicked = () => {
		const { Address, Usage, Public } = emailNew
		createEmail({ Address, Usage, Public })
		setEmailNew({
			Address: '',
			Usage: 'Personal',
			Public: false,
		})
		hideNew()
	}

	const updateClicked = () => {
		const { Address, Usage, Public, UUID } = emailEdit
		updateEmail({ Address, Usage, Public, UUID })
		hideEdit()
	}

	const showOverlay = () => {
		const overlay = document.getElementById('email-overlay')
		if (overlay) overlay.classList.add('open')
	}

	const hideOverlay = () => {
		const overlay = document.getElementById('email-overlay')
		if (overlay) overlay.classList.remove('open')
	}

	const showNew = () => {
		hideEdit()
		showOverlay()
		const dialog = document.getElementById('new-email-dialog')
		if (dialog) dialog.classList.add('open')
	}

	const hideNew = () => {
		const dialog = document.getElementById('new-email-dialog')
		if (dialog) dialog.classList.remove('open')
		hideOverlay()
	}

	const showEdit = () => {
		hideNew()
		showOverlay()
		const dialog = document.getElementById('edit-email-dialog')
		if (dialog) dialog.classList.add('open')
	}

	const hideEdit = () => {
		const dialog = document.getElementById('edit-email-dialog')
		if (dialog) dialog.classList.remove('open')
		hideOverlay()
	}
	return (
		<div>
			<div className="flex flex-wrap">
				<h3>Emails</h3>
				<button onClick={showNew} className="ml-4">
					New Email
				</button>
			</div>
			{emails.map((email, i) => (
				<div key={email.Id || i} className="flex flex-wrap justify-between">
					<div>
						<button onClick={() => editEmail(email.UUID || '')}>Edit</button>
					</div>
					<div>{email.Address}</div>
					<div>{email.Usage}</div>
					<div>{email.Public ? 'Yes' : 'No'}</div>
					<div>
						<button onClick={() => deleteEmail(email.UUID)}>Delete</button>
					</div>
				</div>
			))}
			<div className="modal-overlay" id="email-overlay">
				<div className="modal-fit" id="new-email-dialog">
					<h3>New Email</h3>
					<div className="my-2">
						<div>
							<label htmlFor="Address" className="block">
								Address
							</label>
							<input
								type="email"
								name="Address"
								defaultValue={emailNew.Address}
								onChange={newFieldChanged}
							/>
						</div>
						<div>
							<label htmlFor="Usage" className="block">
								Usage
							</label>
							<select
								name="Usage"
								defaultValue={emailNew.Usage}
								onChange={newFieldChanged}
							>
								{UsageArray.map((u, i) => (
									<option key={i} value={u}>
										{u}
									</option>
								))}
							</select>
						</div>
						<div>
							<input
								type="checkbox"
								name="Public"
								defaultChecked={emailNew.Public}
								onChange={newFieldChanged}
							/>
							<label htmlFor="Public" className="ml-2">
								Public
							</label>
						</div>
					</div>
					<div className="flex flex-wrap justify-between">
						<button onClick={hideNew}>Cancel</button>
						<button onClick={createClicked}>Create Email</button>
					</div>
				</div>
				<div className="modal-fit" id="edit-email-dialog">
					<h3>Edit Email</h3>
					<div className="my-2">
						<div>
							<label htmlFor="Address" className="block">
								Address
							</label>
							<input
								type="email"
								name="Address"
								defaultValue={emailEdit.Address}
								onChange={editFieldChanged}
							/>
						</div>
						<div>
							<label htmlFor="Usage" className="block">
								Usage
							</label>
							<select
								name="Usage"
								defaultValue={emailEdit.Usage}
								onChange={editFieldChanged}
							>
								{UsageArray.map((u, i) => (
									<option key={i} value={u}>
										{u}
									</option>
								))}
							</select>
						</div>
						<div>
							<input
								type="checkbox"
								name="Public"
								defaultChecked={emailEdit.Public}
								onChange={editFieldChanged}
							/>
							<label htmlFor="Public" className="ml-2">
								Public
							</label>
						</div>
					</div>
					<div className="flex flex-wrap justify-between">
						<button onClick={hideEdit}>Cancel</button>
						<button onClick={updateClicked}>Update Email</button>
					</div>
				</div>
			</div>
		</div>
	)
}
