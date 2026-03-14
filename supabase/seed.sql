insert into public.destinations (
  country_code,
  city,
  visa_requirements,
  budget_estimates,
  itinerary_templates,
  last_verified_at
)
values (
  'GH',
  'Accra',
  '{"NG": {"requirement_type": "visa-free", "allowed_stay_days": 90}}'::jsonb,
  '{"budget": {"amount": 700, "currency": "USD"}}'::jsonb,
  '[{"duration_days": 7, "title": "Accra Starter"}]'::jsonb,
  timezone('utc', now())
)
on conflict (country_code, city) do nothing;
