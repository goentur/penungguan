import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { SendIcon } from 'lucide-react';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Konfirmasi Kata Sandi Anda"
            description="Ini adalah area aman dalam aplikasi. Harap konfirmasi kata sandi Anda sebelum melanjutkan."
        >
            <Head title="Konfirmasi Kata Sandi" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Kata Sandi</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Masukkan kata sandi"
                                autoComplete="current-password"
                                autoFocus
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing ? <Spinner /> : <SendIcon />}
                                Kirim
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}