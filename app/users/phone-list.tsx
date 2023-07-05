'use client'

import { PhoneTypeArray, UsageArray } from '@/types/array.types'
import { PhoneType } from '@/types/phone.type'
import { useState } from 'react'

export default function PhoneList({
	phones,
	createPhone,
	updatePhone,
	deletePhone,
}: {
	phones: PhoneType[]
	createPhone: Function
	updatePhone: Function
	deletePhone: Function
}) {
	const [phoneNew, setPhoneNew] = useState<PhoneType>({
		Number: '',
		Type: 'Cellular',
		Usage: 'Personal',
		Public: false,
	})
	const [phoneEdit, setPhoneEdit] = useState<PhoneType>({
		Number: '',
		Type: 'Cellular',
		Usage: 'Personal',
		Public: false,
	})

	const newFieldChanged = (ev: any) => {
		const { name, value, checked } = ev.target
		let update: PhoneType = {}
		switch (name) {
			case 'Number':
			case 'Type':
			case 'Usage':
				update = {
					...phoneNew,
					[name]: value,
				}
				break
			case 'Public':
				update = {
					...phoneNew,
					[name]: checked,
				}
				break
		}
		setPhoneNew(update)
	}

	const editFieldChanged = (ev: any) => {
		const { name, value, checked } = ev.target
		let update: PhoneType = {}
		switch (name) {
			case 'Number':
			case 'Type':
			case 'Usage':
				update = {
					...phoneEdit,
					[name]: value,
				}
				break
			case 'Public':
				update = {
					...phoneEdit,
					[name]: checked,
				}
				break
		}
		setPhoneEdit(update)
	}

	const editPhone = (uuid: string) => {
		const phone = phones.find((p) => p.UUID == uuid) || {
			Number: '',
			Type: 'Cellular',
			Usage: 'Personal',
			Public: false,
		}
		setPhoneEdit(phone)
		showEdit()
	}

	const createClicked = () => {
		const { Number, Type, Usage, Public } = phoneNew
		createPhone({ Number, Type, Usage, Public })
		setPhoneNew({
			Number: '',
			Type: 'Cellular',
			Usage: 'Personal',
			Public: false,
		})
		hideNew()
	}

	const updateClicked = () => {
		const { Number, Type, Usage, Public, UUID } = phoneEdit
		updatePhone({ Number, Type, Usage, Public, UUID })
		hideEdit()
	}

	const showOverlay = () => {
		const overlay = document.getElementById('phone-overlay')
		if (overlay) overlay.classList.add('open')
	}

	const hideOverlay = () => {
		const overlay = document.getElementById('phone-overlay')
		if (overlay) overlay.classList.remove('open')
	}

	const showNew = () => {
		hideEdit()
		showOverlay()
		const dialog = document.getElementById('new-phone-dialog')
		if (dialog) dialog.classList.add('open')
	}

	const hideNew = () => {
		const dialog = document.getElementById('new-phone-dialog')
		if (dialog) dialog.classList.remove('open')
		hideOverlay()
	}

	const showEdit = () => {
		hideNew()
		showOverlay()
		const dialog = document.getElementById('edit-phone-dialog')
		if (dialog) dialog.classList.add('open')
	}

	const hideEdit = () => {
		const dialog = document.getElementById('edit-phone-dialog')
		if (dialog) dialog.classList.remove('open')
		hideOverlay()
	}
	return (
		<div>
			<div className="flex flex-wrap">
				<h3>Phones</h3>
				<button onClick={showNew} className="ml-4">
					New Phone
				</button>
			</div>
			{phones.map((phone, i) => (
				<div key={phone.UUID || i} className="flex flex-wrap justify-between">
					<div>
						<button onClick={() => editPhone(phone.UUID || '')}>Edit</button>
					</div>
					<div>{phone.Number}</div>
					<div>{phone.Type}</div>
					<div>{phone.Usage}</div>
					<div>{phone.Public ? 'Yes' : 'No'}</div>
					<div>
						<button onClick={() => deletePhone(phone.UUID)}>Delete</button>
					</div>
				</div>
			))}
			<div className="modal-overlay" id="phone-overlay">
				<div className="modal-fit" id="new-phone-dialog">
					<h3>New Phone</h3>
					<div className="my-2">
						<div>
							<label htmlFor="Number" className="block">
								Number
							</label>
							<input
								type="tel"
								name="Number"
								value={phoneNew.Number}
								onChange={newFieldChanged}
							/>
						</div>
						<div>
							<label htmlFor="Type" className="block">
								Type
							</label>
							<select name="Type" onChange={newFieldChanged}>
								{PhoneTypeArray.map((t, i) => (
									<option key={i} value={t} selected={t == phoneNew.Type}>
										{t}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="Usage" className="block">
								Usage
							</label>
							<select name="Usage" onChange={newFieldChanged}>
								{UsageArray.map((u, i) => (
									<option key={i} value={u} selected={u == phoneNew.Usage}>
										{u}
									</option>
								))}
							</select>
						</div>
						<div>
							<input
								type="checkbox"
								name="Public"
								checked={phoneNew.Public}
								onChange={newFieldChanged}
							/>
							<label htmlFor="Public" className="ml-2">
								Public
							</label>
						</div>
					</div>
					<div className="flex flex-wrap justify-between">
						<button onClick={hideNew}>Cancel</button>
						<button onClick={createClicked}>Create Phone</button>
					</div>
				</div>

				<div className="modal-fit" id="edit-phone-dialog">
					<h3>Edit Phone</h3>
					<div className="my-2">
						<div>
							<label htmlFor="Number" className="block">
								Number
							</label>
							<input
								type="tel"
								name="Number"
								value={phoneEdit.Number}
								onChange={editFieldChanged}
							/>
						</div>
						<div>
							<label htmlFor="Type" className="block">
								Type
							</label>
							<select name="Type" onChange={editFieldChanged}>
								{PhoneTypeArray.map((t, i) => (
									<option key={i} value={t} selected={t == phoneEdit.Type}>
										{t}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="Usage" className="block">
								Usage
							</label>
							<select name="Usage" onChange={editFieldChanged}>
								{UsageArray.map((u, i) => (
									<option key={i} value={u} selected={u == phoneEdit.Usage}>
										{u}
									</option>
								))}
							</select>
						</div>
						<div>
							<input
								type="checkbox"
								name="Public"
								checked={phoneEdit.Public}
								onChange={editFieldChanged}
							/>
							<label htmlFor="Public" className="ml-2">
								Public
							</label>
						</div>
					</div>
					<div className="flex flex-wrap justify-between">
						<button onClick={hideEdit}>Cancel</button>
						<button onClick={updateClicked}>Update Phone</button>
					</div>
				</div>
			</div>
		</div>
	)
}
