insert into public.quizzes (lesson_id, question, option_a, option_b, option_c, option_d, correct_option, explanation)
values
  ('ch1', 'What is the first rule of financial discipline?', 'Spend more than income', 'Spend less than income', 'Borrow every month', 'Avoid saving', 'B', 'Spending less than you earn is the foundation of discipline.'),
  ('ch1', 'Who is financially stronger?', 'Earns more but saves nothing', 'Earns less but saves regularly', 'Spends everything', 'Avoids planning', 'B', 'Consistent savings create resilience.'),
  ('ch2', 'Which formula is better?', 'Income - Expense = Saving', 'Income - Saving = Expense', 'Income = Expense', 'Saving = Debt', 'B', 'Saving first creates consistency.'),
  ('ch2', 'Saving Rs. 2,000 monthly becomes how much in one year?', 'Rs. 12,000', 'Rs. 24,000', 'Rs. 50,000', 'Rs. 5,000', 'B', '2,000 multiplied by 12 is 24,000.'),
  ('ch3', 'In the 50/30/20 rule, 20% is for:', 'Wants', 'Savings or investment', 'Rent only', 'Entertainment', 'B', 'Twenty percent should be reserved for future value.'),
  ('ch4', 'Good debt helps:', 'Increase income or value', 'Create unnecessary spending', 'Avoid repayment', 'Hide income', 'A', 'Productive debt supports growth.'),
  ('ch5', 'OTP should be shared with:', 'Anyone', 'Only trusted friends', 'No one', 'Bank posters', 'C', 'OTP is private and must never be shared.'),
  ('ch6', 'Before sending digital payment, you should check:', 'Receiver name', 'Weather', 'Social media', 'Random links', 'A', 'Always verify receiver identity before transfer.'),
  ('ch7', 'Every investment has risk.', 'True', 'False', 'Only stocks', 'Only gold', 'A', 'There is no risk-free investment.'),
  ('ch8', 'Guaranteed double money quickly is usually:', 'Safe', 'Risky scam sign', 'Policy', 'Bank feature', 'B', 'Guaranteed high returns are a common scam signal.'),
  ('ch9', 'Profit means:', 'Revenue - Cost', 'Cost - Revenue', 'Revenue only', 'Cost only', 'A', 'Profit is what remains after costs.'),
  ('ch10', 'Wealth is built through:', 'Discipline and patience', 'Luck only', 'Borrowing only', 'Ignoring risk', 'A', 'Systems and discipline build long-term wealth.')
on conflict do nothing;
