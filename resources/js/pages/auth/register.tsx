import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { LogInIcon } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout
            title="Buat Akun"
            description="Masukkan detail Anda di bawah ini untuk membuat akun baru"
        >
            <Head title="Daftar" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="nid">NID</Label>
                                <Input
                                    id="nid"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="nid"
                                    name="nid"
                                    placeholder="Nomor Indentitas Diri"
                                />
                                <span className='text-[10px] italic'>Contoh : <span className='font-bold'>KTP / NIB / NO PASSPOR</span></span>
                                <InputError message={errors.nid}/>
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Buat kata sandi"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Kata Sandi
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Ulangi kata sandi"
                                />
                                <InputError message={errors.password_confirmation}/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={4}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap Anda"
                                />
                                <InputError message={errors.name}/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={5}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <span className='text-[10px] italic'>digunakan untuk verifikasi email dan apabila Anda lupa password</span>
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telp">WhatsApp</Label>
                                <Input
                                    id="telp"
                                    type="text"
                                    required
                                    tabIndex={6}
                                    autoComplete="telp"
                                    name="telp"
                                    placeholder="081xxxxxxxxx"
                                />
                                <span className='text-[10px] italic'>digunakan untuk menghubungi Anda untuk konfirmasi data</span>
                                <InputError message={errors.telp} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing ? <Spinner /> : <LogInIcon />}
                                Daftar
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Masuk
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}