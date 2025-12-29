import { useState } from 'react';
import { useI18n } from '@/hooks/use-i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

function I18nExample() {
  const { t, currentLanguage, changeLanguage } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [counter, setCounter] = useState(0);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('messages.success'));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAge('');
    setCounter(0);
  };

  return (
    <div className="w-[90%] max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('welcome')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {t('currentLanguage')}: {currentLanguage === 'tr' ? t('turkish') : t('english')}
          </Badge>
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tr">{t('turkish')}</SelectItem>
              <SelectItem value="en">{t('english')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Greeting Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('greeting', { name: name || 'Kullanıcı' })}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('user.name')}</CardTitle>
            <CardDescription>Form örneği</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('user.name')}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('user.name')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('user.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('user.email')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">{t('user.age')}</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t('user.age')}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">{t('user.submit')}</Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  {t('user.reset')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('counter.title')}</CardTitle>
            <CardDescription>{t('counter.currentValue', { count: counter })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{counter}</div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setCounter(counter + 1)}>
                {t('counter.increment')}
              </Button>
              <Button onClick={() => setCounter(counter - 1)} variant="outline">
                {t('counter.decrement')}
              </Button>
              <Button onClick={() => setCounter(0)} variant="destructive">
                {t('counter.reset')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('messages.success')}</CardTitle>
          <CardDescription>Mesaj örnekleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="font-semibold text-green-800 dark:text-green-200">
                {t('messages.success')}
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <p className="font-semibold text-red-800 dark:text-red-200">
                {t('messages.error')}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="font-semibold text-blue-800 dark:text-blue-200">
                {t('messages.loading')}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {t('messages.noData')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Example */}
      <Card>
        <CardHeader>
          <CardTitle>{t('products.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <CardTitle className="text-lg">Ürün {item}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('products.description')}: Ürün açıklaması {item}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{t('products.price')}: $99</span>
                    <Badge>{t('products.stock')}: 10</Badge>
                  </div>
                  <Button className="w-full mt-2">{t('products.addToCart')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default I18nExample;

