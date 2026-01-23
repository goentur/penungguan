import Combobox from '@/components/combobox';
import FormInputCurrency from '@/components/form-input-currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle} from "@/components/ui/field";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { alertApp } from '@/components/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, IndexGate } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, ReceiptText, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bike, Car, Globe, Package } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';


interface OptionItem {
	value: string | number;
	label: string;
	alamat?: string;
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
		title: 'Pengawasan',
		href: 'transaksi.penungguan.index',
	},
];

export default function Index({ gate }: IndexGate) {
	const title = 'Pengawasan';
	const [dataObjekPajak, setDataObjekPajak] = useState<OptionItem[]>([]);
	const [dataPenunggua, setDataPenunggua] = useState<any>();

	const {
		data,
		setData,
		errors,
		post,
		processing,
	} = useForm({
		objek: '',
		nominal: '',
		kendaraan: 'motor',
	});
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
				value: item.id,
				label: item.nama,
				alamat: item.alamat,
			}));
			setDataObjekPajak(formatted);
		} catch (error: any) {
			alertApp(error.message || 'Gagal memuat data objek pajak', 'error');
		}
	};
	const getDataPenungguan = async (value:string) => {
		try {
			const response = await axios.post(route('transaksi.penungguan.data', {objek : value}));
			setDataPenunggua(response.data);
		} catch (error: any) {
			alertApp(error.message || 'Gagal memuat data penungguhan', 'error');
		}
	};

	const handleForm = (e: React.FormEvent) => {
		e.preventDefault()
			post(route('transaksi.penungguan.store', data), {
				preserveScroll: true,
				onSuccess: (e : any) => {
					alertApp(e)
					setData({ objek: data.objek, nominal: '', kendaraan: data.kendaraan });
					getDataPenungguan(data.objek)
				},
				onError: (e : any) => {
					alertApp('Gagal menyimpan data', 'error');
			},
		})
	}

	const paymentDetails = [
		{
		label: "Motor",
		value: dataPenunggua?.kendaraan?.motor?? 0,
		icon: <Bike size={20} />,
		bgColor: "bg-blue-500/10",
		textColor: "text-blue-600 dark:text-blue-400",
		valueColor: "text-blue-700 dark:text-blue-300",
		},
		{
		label: "Mobil",
		value: dataPenunggua?.kendaraan?.mobil?? 0,
		icon: <Car size={20} />,
		bgColor: "bg-green-500/10",
		textColor: "text-green-600 dark:text-green-400",
		valueColor: "text-green-700 dark:text-green-300",
		},
		{
		label: "Online",
		value: dataPenunggua?.kendaraan?.online?? 0,
		icon: <Globe size={20} />,
		bgColor: "bg-purple-500/10",
		textColor: "text-purple-600 dark:text-purple-400",
		valueColor: "text-purple-700 dark:text-purple-300",
		},
		{
		label: "Lainnya",
		value: dataPenunggua?.kendaraan?.lainnya?? 0,
		icon: <Package size={20} />,
		bgColor: "bg-amber-500/10",
		textColor: "text-amber-600 dark:text-amber-400",
		valueColor: "text-amber-700 dark:text-amber-300",
		},
	];

	const selectedObjekLabel = dataObjekPajak.find((d) => String(d.value) === String(data.objek))?.label || '';
	const selectedObjekAlamat = dataObjekPajak.find((d) => String(d.value) === String(data.objek))?.alamat || '';
	
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
										<Combobox label="objekPajak" selectedValue={data.objek} options={dataObjekPajak} onSelect={(e) => {setData((prevData: any) => ({ ...prevData, objek: e })), getDataPenungguan(e)}}/>
									</div>
								)}
								{data.objek && (
									<div className="animate-fade-in space-y-5">
										<div className="p-3 rounded-md bg-secondary/40 border">
											<p className="text-sm text-foreground text-center">
												<span className="font-semibold">{selectedObjekLabel}</span><br />
												<small>{selectedObjekAlamat}</small>
											</p>
										</div>
										<div className="space-y-2">
											<FormInputCurrency id="nominal" value={data.nominal} onChange={(value) => setData((prevData: any) => ({ ...prevData, nominal: value }))} placeholder="Masukkan total pembayaran" autoComplete={"off"} size={"lg"}/>
											{errors.nominal && <p className="text-sm text-destructive">{errors.nominal}</p>}
										</div>
										<div className="space-y-2">
											<Label className="capitalize">Kendaraan yang dinaiki :</Label>
											<RadioGroup defaultValue="motor" onValueChange={(value) => setData((prevData: any) => ({ ...prevData, kendaraan:value }))} className="max-w-sm mt-1">
												<div className="grid grid-cols-2 md:grid-cols-2 gap-3 mt-2">
													<FieldLabel htmlFor="motor">
														<Field orientation="horizontal">
															<FieldContent>
																<FieldTitle>Motor</FieldTitle>
															</FieldContent>
															<RadioGroupItem value="motor" id="motor" />
														</Field>
													</FieldLabel>
													<FieldLabel htmlFor="mobil">
														<Field orientation="horizontal">
															<FieldContent>
																<FieldTitle>Mobil</FieldTitle>
															</FieldContent>
															<RadioGroupItem value="mobil" id="mobil" />
														</Field>
													</FieldLabel>
													<FieldLabel htmlFor="online">
														<Field orientation="horizontal">
															<FieldContent>
																<FieldTitle>Online</FieldTitle>
															</FieldContent>
															<RadioGroupItem value="online" id="online" />
														</Field>
													</FieldLabel>
													<FieldLabel htmlFor="lainnya">
														<Field orientation="horizontal">
															<FieldContent>
																<FieldTitle>Lainnya</FieldTitle>
															</FieldContent>
															<RadioGroupItem value="lainnya" id="lainnya" />
														</Field>
													</FieldLabel>
												</div>
											</RadioGroup>
										</div>
										<div className="flex justify-center gap-3 pt-2">
											<Button type="button" variant="destructive" onClick={() => {setData({ objek: '', nominal: '', kendaraan: 'motor' });}}><RotateCcw /> Muat ulang</Button>
											<Button type="button" disabled={processing} onClick={handleForm}>{processing ? (<Loader2 className="animate-spin" />) : (<Save /> )} Simpan
											</Button>
										</div>
									</div>
								)}
							</div>
						)}
					</CardContent>
				</Card>
				{data.objek && (
					<Card className="border-border shadow-lg transition-all duration-300 hover:shadow-xl">
						<CardContent className="space-y-5">
							<div className="rounded-lg bg-primary/5 p-4 text-center">
								<p className="text-sm text-muted-foreground">Total Keseluruhan</p>
								<p className="mt-1 text-xl font-bold text-primary">Rp {dataPenunggua?.total} ({dataPenunggua?.jumlah} nota)</p>
							</div>
							<Separator className="my-2"/>
							<div className="grid grid-cols-4 md:grid-cols-4 gap-3 mt-4">
								{paymentDetails.map((item, index) => (
								<div key={index} className="flex flex-col items-center justify-center p-4 rounded-xl bg-card border border-border transition-all duration-200 hover:bg-secondary/30 hover:scale-105">
									<div className={`p-3 rounded-full ${item.bgColor} mb-2`}>
									{item.icon}
									</div>
									<span className={`text-lg font-bold ${item.valueColor}`}>{item.value}</span>
								</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</AppLayout>
	);
}