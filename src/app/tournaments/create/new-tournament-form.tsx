'use client';

import { turboPascal } from '@/app/fonts';
import FormDatePicker from '@/app/tournaments/create/form-date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import TypeCard from '@/components/ui/type-card';
import { createTournament } from '@/lib/actions/tournament-managing';
import { DatabaseUser } from '@/lib/db/schema/auth';
import { DatabaseClub } from '@/lib/db/schema/tournaments';
import {
  NewTournamentFormType,
  newTournamentFormSchema,
} from '@/lib/zod/new-tournament-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function NewTournamentForm({
  clubs,
  user,
}: NewTournamentFormProps) {
  const [defaultClub] = React.useState('');
  const form = useForm<NewTournamentFormType>({
    resolver: zodResolver(newTournamentFormSchema),
    defaultValues: {
      title: defaultClub,
      format: undefined,
      date: new Date(),
      timestamp: 0,
      type: 'solo',
      rated: false,
    },
  });

  const onSubmit = async (data: NewTournamentFormType) => {
    setSubmitButton(
      <Button disabled className="w-full">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        making...
      </Button>,
    );
    try {
      await createTournament(data);
    } catch (e) {
      setSubmitButton(
        <Button type="submit" className="w-full">
          make tournament
        </Button>,
      );
      toast.error("sorry! server error happened, couldn't make tournament");
    }
  };

  const [submitButton, setSubmitButton] = React.useState(
    <Button type="submit" className="w-full">
      make tournament
    </Button>,
  );

  return (
    <Form {...form}>
      <h2
        className={`m-2 text-center text-4xl font-bold ${turboPascal.className}`}
      >
        make tournament
      </h2>
      <Card className="mx-auto max-w-[min(600px,98%)] border-none shadow-none sm:border-solid sm:shadow-sm">
        <CardContent className="p-4 sm:p-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
            name="new-tournament-form"
          >
            <FormField
              control={form.control}
              name="club_id"
              defaultValue={user.selected_club}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) => {
                        if (!ref) return;
                        ref.ontouchstart = (e) => e.preventDefault();
                      }}
                    >
                      <SelectGroup>
                        {clubs.map((club: DatabaseClub) => (
                          <SelectItem key={club.id} value={club.id}>
                            {club.name}
                          </SelectItem>
                        ))}
                        <SelectGroup>
                          <Link
                            href="/club/create"
                            className="m-0 box-border h-[30px] w-full p-0"
                          >
                            <Button
                              variant="ghost"
                              className="flex h-[30px] w-full flex-row justify-end gap-2 pl-7 font-extrabold text-muted-foreground"
                            >
                              <PlusIcon fontStyle="bold" /> new club
                            </Button>
                          </Link>
                        </SelectGroup>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              defaultValue="swiss"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="choose a format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      ref={(ref) => {
                        if (!ref) return;
                        ref.ontouchstart = (e) => e.preventDefault();
                      }}
                    >
                      <SelectGroup>
                        <SelectItem value="swiss">swiss</SelectItem>
                        <SelectItem value="round robin">round robin</SelectItem>
                        <SelectItem value="single elimination">
                          single elimination
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-2 sm:gap-4"
                  >
                    <TypeCard name="solo" />
                    <TypeCard name="doubles" />
                    <TypeCard name="team" />
                  </RadioGroup>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => <FormDatePicker field={field} />}
            />
            <FormField
              control={form.control}
              name="rated"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <div className="peer flex items-center space-x-2">
                    <Label htmlFor="rated" className="text-muted-foreground">
                      rated
                    </Label>
                    <Switch
                      id="rated"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                    />
                  </div>
                  <p className="hidden text-sm text-muted-foreground peer-hover:block">
                    <span className="text-xs">*</span>comming soon
                  </p>
                </div>
              )}
            />
            {submitButton}
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}

interface NewTournamentFormProps {
  clubs: Array<DatabaseClub>;
  user: DatabaseUser;
}
