import Combobox from '@/components/combobox';
import FormInputCurrency from '@/components/form-input-currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { alertApp } from '@/components/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, IndexGate } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OptionItem {
	value: string | number;
	label: string;
}

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Beranda',
		href: 'beranda',
	},
	{
		title: 'Transaksi',
		href: 'transaksi.penungguan.index',
	},
	{
		title: 'Penungguan',
		href: 'transaksi.penungguan.index',
	},
];

export default function Index({ gate }: IndexGate) {
	const title = 'Penungguan';
	const [dataObjekPajak, setDataObjekPajak] = useState<OptionItem[]>([]);

	const {
		data,
		setData,
		errors,
		post,
		processing,
	} = useForm({
		objek: '',
		nominal: '',
		kendaraan: '',
	});

	const kendaraan: OptionItem[] = [
		{ value: 1, label: 'Sepeda' },
		{ value: 2, label: 'Mobil' },
		{ value: 3, label: 'Motor' },
	];

	useEffect(() => {
		getDataDataObjekPajakk();
	}, []);

	const getDataDataObjekPajakk = async () => {
		try {
			const response = await axios.post(route('master.objek-pajak.list'));
			let list = response.data;
			if (!Array.isArray(list) && Array.isArray(list?.data)) {
				list = list.data;
			}
			const formatted: OptionItem[] = list.map((item: any) => ({
				value: item.id || item.value,
				label: item.nama || item.label,
			}));
			setDataObjekPajak(formatted);
		} catch (error: any) {
			alertApp(error.message || 'Gagal memuat data objek pajak', 'error');
		}
	};
	const handleForm = (e: React.FormEvent) => {
		e.preventDefault()
			post(route('transaksi.penungguan.store', data), {
				preserveScroll: true,
				onSuccess: (e : any) => {
					alertApp(e)
					setData({ objek: data.objek, nominal: '', kendaraan: '' });
				},
				onError: (e : any) => {
					alertApp('Gagal menyimpan data', 'error');
			},
		})
	}

	const selectedObjekLabel = dataObjekPajak.find((d) => String(d.value) === String(data.objek))?.label || '';

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={title} />
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl">{title}</CardTitle>
					</CardHeader>
					<CardContent>
						{dataObjekPajak.length === 0 ? (
							<div className="text-center py-6 text-muted-foreground">
								Memuat data objek pajak...
							</div>
						) : (
							<div className="space-y-6">
								{!data.objek && (
									<div className="animate-fade-in">
										<Combobox label="objekPajak" selectedValue={data.objek} options={dataObjekPajak} onSelect={(value) => setData('objek', value)}/>
									</div>
								)}
								{data.objek && (
									<div className="animate-fade-in space-y-5">
										<div className="p-3 rounded-md bg-secondary/40 border">
											<p className="text-sm text-foreground">
												<span className="font-semibold">{selectedObjekLabel}</span>
											</p>
										</div>
										<div className="space-y-2">
											<FormInputCurrency id="nominal" value={data.nominal} onChange={(value) => setData('nominal', value)} placeholder="Masukkan total pembayaran" autocomplete={"off"}/>
											{errors.nominal && <p className="text-sm text-destructive">{errors.nominal}</p>}
										</div>
										<div className="space-y-2">
											<Combobox label="kendaraan" selectedValue={data.kendaraan} options={kendaraan} onSelect={(value) => setData('kendaraan', value)}/>
											{errors.kendaraan && <p className="text-sm text-destructive">{errors.kendaraan}</p>}
										</div>
										<div className="flex flex-wrap gap-3 pt-2">
											<Button type="button" variant="destructive" onClick={() => {setData({ objek: '', nominal: '', kendaraan: '' });}}><RotateCcw /> Muat ulang</Button>
											<Button type="button" disabled={processing} onClick={handleForm}>{processing ? (<Loader2 className="animate-spin" />) : (<Save /> )} Simpan
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}